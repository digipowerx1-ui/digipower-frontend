import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { initializeCronJobs, triggerManual } from './cron/index.js';

dotenv.config();

const app = express();
const PORT = process.env.API_PORT || 3000;
const DEFAULT_SYMBOL = 'DGXX';

// Middleware
app.use(cors());
app.use(express.json());

// Store for stock data cache
let stockCache = {
  data: null,
  timestamp: null,
  ttl: 5000 // 5 seconds - reduced for more real-time data
};

// Fetch stock data from Massive API (Polygon) with real-time plan features
async function fetchStockData(symbol = DEFAULT_SYMBOL) {
  const apiKey = process.env.MASSIVE_API_KEY;

  if (!apiKey) {
    console.error('MASSIVE_API_KEY is not set');
    throw new Error('Server configuration error');
  }

  try {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    // With paid real-time plan ($199), use the best endpoints available
    const snapshotUrl = `https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`;
    const quoteUrl = `https://api.massive.com/v3/quotes/${symbol}?limit=1&order=desc&apiKey=${apiKey}`;  // Real-time quotes (paid tier)
    const lastTradeUrl = `https://api.massive.com/v3/trades/${symbol}?limit=1&order=desc&apiKey=${apiKey}`;  // Real-time trades (paid tier)
    const dailyUrl = `https://api.massive.com/v1/open-close/${symbol}/${today}?adjusted=true&apiKey=${apiKey}`;

    const [snapshotRes, quoteRes, tradeRes, dailyRes] = await Promise.all([
      fetch(snapshotUrl).catch((err) => {
        console.error('Snapshot request failed:', err);
        return null;
      }),
      fetch(quoteUrl).catch((err) => {
        console.error('Real-time quote request failed:', err);
        return null;
      }),
      fetch(lastTradeUrl).catch((err) => {
        console.error('Real-time trade request failed:', err);
        return null;
      }),
      fetch(dailyUrl).catch((err) => {
        console.error('Daily request failed:', err);
        return null;
      }),
    ]);

    const snapshotOk = snapshotRes?.ok;
    const quoteOk = quoteRes?.ok;
    const tradeOk = tradeRes?.ok;
    const dailyOk = dailyRes?.ok;

    if (!snapshotOk && !quoteOk && !tradeOk && !dailyOk) {
      throw new Error('Unable to fetch stock data from any source');
    }

    const snapshotData = snapshotOk ? await snapshotRes.json() : null;
    const quoteData = quoteOk ? await quoteRes.json() : null;
    const tradeData = tradeOk ? await tradeRes.json() : null;
    const dailyData = dailyOk ? await dailyRes.json() : null;

    // Priority: real-time quote > real-time trade > snapshot > daily
    const snapshot = snapshotData?.ticker;
    const quote = quoteData?.results?.[0];  // Latest real-time quote
    const trade = tradeData?.results?.[0];   // Latest real-time trade
    const daily = dailyData;

    // Get the most recent price from available sources (real-time first!)
    // Use ASK price as main price (what trading platforms display)
    const livePrice =
      Number(quote?.ask_price) ||           // Real-time ask price (paid tier) - what platforms show
      Number(trade?.price) ||               // Real-time trade price (paid tier)
      Number(quote?.bid_price) ||           // Real-time bid price (paid tier)
      Number(snapshot?.day?.c) ||           // Snapshot closing price
      Number(snapshot?.min?.c) ||           // Snapshot minute close
      Number(snapshot?.lastTrade?.p) ||     // Snapshot last trade
      Number(daily?.close) ||               // Daily close
      Number(daily?.afterHours) ||          // After hours
      Number(daily?.high) ||                // Daily high
      Number(daily?.open);                  // Daily open

    const openPrice =
      Number(snapshot?.day?.o) ||
      Number(daily?.open) ||
      Number(trade?.price) ||
      null;

    const volume =
      Number(snapshot?.day?.v) ||
      Number(daily?.volume) ||
      Number(trade?.size) ||
      0;

    const high =
      Number(snapshot?.day?.h) ||
      Number(daily?.high) ||
      livePrice ||
      null;

    const low =
      Number(snapshot?.day?.l) ||
      Number(daily?.low) ||
      livePrice ||
      null;

    const previousClose =
      Number(snapshot?.prevDay?.c) ||
      Number(daily?.previousClose) ||
      null;

    // Get bid/ask spread for real-time data transparency
    const bidPrice = Number(quote?.bid_price) || null;
    const askPrice = Number(quote?.ask_price) || null;
    const spread = bidPrice && askPrice ? Number((askPrice - bidPrice).toFixed(4)) : null;

    if (!livePrice) {
      throw new Error('Stock price unavailable at this time');
    }

    const change = openPrice ? livePrice - openPrice : 0;
    const changePercent = openPrice ? (change / openPrice) * 100 : 0;

    // Safely handle timestamp conversion - use the most recent timestamp
    let lastUpdated;
    try {
      // Check multiple timestamp sources (real-time first)
      const quoteTime = quote?.sip_timestamp;
      const tradeTime = trade?.sip_timestamp || trade?.participant_timestamp;
      const snapshotTime = snapshot?.updated || snapshot?.lastTrade?.t;

      const timestamp = quoteTime || tradeTime || snapshotTime;

      if (timestamp) {
        // Handle both millisecond and nanosecond timestamps
        const ms = timestamp > 10000000000000 ? Math.floor(timestamp / 1000000) : timestamp;
        const date = new Date(ms);
        lastUpdated = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
      } else {
        lastUpdated = new Date().toISOString();
      }
    } catch {
      lastUpdated = new Date().toISOString();
    }

    // Determine data source for transparency (real-time sources prioritized)
    const dataSource = quote?.bid_price
      ? 'realtime_quote'
      : trade?.price
      ? 'realtime_trade'
      : snapshot?.day?.c
      ? 'snapshot'
      : 'end_of_day';

    const response = {
      symbol,
      price: Number(livePrice.toFixed(4)),
      open: openPrice !== null ? Number(openPrice.toFixed(4)) : null,
      high: high !== null ? Number(high.toFixed(4)) : null,
      low: low !== null ? Number(low.toFixed(4)) : null,
      volume,
      previousClose,
      change: Number(change.toFixed(4)),
      changePercent: Number(changePercent.toFixed(4)),
      lastUpdated,
      source: dataSource,
    };

    // Add bid/ask spread for real-time data (when available)
    if (bidPrice && askPrice) {
      response.bidPrice = bidPrice;
      response.askPrice = askPrice;
      response.spread = spread;
    }

    return response;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
}

// Fetch historical stock data
async function fetchHistoricalData(symbol = DEFAULT_SYMBOL, date) {
  const apiKey = process.env.MASSIVE_API_KEY;

  if (!apiKey) {
    throw new Error('Server configuration error');
  }

  try {
    const dailyUrl = `https://api.massive.com/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=${apiKey}`;
    const response = await fetch(dailyUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${date}`);
    }

    const data = await response.json();

    return {
      status: 'OK',
      symbol,
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume,
      afterHours: data.afterHours,
      preMarket: data.preMarket,
      date,
      source: 'polygon',
    };
  } catch (error) {
    console.error(`Error fetching historical data for ${date}:`, error);
    return null;
  }
}

// API Routes

// GET /api/live-stock - Get live stock data
app.get('/api/live-stock', async (req, res) => {
  try {
    const symbol = req.query.symbol?.toUpperCase() || DEFAULT_SYMBOL;

    // Check cache
    const now = Date.now();
    if (stockCache.data && stockCache.timestamp && (now - stockCache.timestamp) < stockCache.ttl) {
      console.log('Returning cached stock data');
      return res.json(stockCache.data);
    }

    const data = await fetchStockData(symbol);

    // Update cache
    stockCache = {
      data,
      timestamp: now,
      ttl: 5000
    };

    res.json(data);
  } catch (error) {
    console.error('Error in /api/live-stock:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// GET /api/stock - Get historical stock data for a specific date
app.get('/api/stock', async (req, res) => {
  try {
    const symbol = req.query.symbol?.toUpperCase() || DEFAULT_SYMBOL;
    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }

    const data = await fetchHistoricalData(symbol, date);

    if (!data) {
      return res.status(404).json({ error: 'No data available for the specified date' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error in /api/stock:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Manual cron trigger endpoint (for testing)
app.post('/api/cron/stock-eod/trigger', async (req, res) => {
  const apiKey = req.headers['x-api-key'];

  // Check API key for authentication
  if (!process.env.CRON_API_KEY || apiKey !== process.env.CRON_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
  }

  try {
    const result = await triggerManual({
      dryRun: req.query.dryRun === 'true',
      testEmail: req.query.testEmail || null
    });

    res.json({
      success: true,
      message: 'Stock EOD job triggered successfully',
      result
    });
  } catch (error) {
    console.error('Manual trigger error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to trigger stock EOD job'
    });
  }
});

// Create HTTP server
const server = createServer(app);

// WebSocket Server for real-time updates
const wss = new WebSocketServer({ server, path: '/ws/stock' });

// Store connected clients
const clients = new Set();

wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');
  clients.add(ws);

  // Send initial stock data
  fetchStockData(DEFAULT_SYMBOL)
    .then(data => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ type: 'stock-update', data }));
      }
    })
    .catch(err => console.error('Error sending initial data:', err));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());

      // Handle subscribe to specific symbol
      if (data.type === 'subscribe' && data.symbol) {
        console.log(`Client subscribed to ${data.symbol}`);
        // Store subscription info (you can extend this)
        ws.subscribedSymbol = data.symbol;
      }
    } catch (err) {
      console.error('Error parsing WebSocket message:', err);
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Broadcast stock updates to all connected clients every 5 seconds for real-time data
setInterval(async () => {
  if (clients.size > 0) {
    try {
      const data = await fetchStockData(DEFAULT_SYMBOL);

      // Update cache
      stockCache = {
        data,
        timestamp: Date.now(),
        ttl: 5000
      };

      const message = JSON.stringify({ type: 'stock-update', data });

      clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(message);
        }
      });

      console.log(`Broadcasted stock update to ${clients.size} clients`);
    } catch (error) {
      console.error('Error broadcasting stock updates:', error);
    }
  }
}, 5000); // 5 seconds - reduced for real-time updates

// Start server
server.listen(PORT, () => {
  console.log(`\n🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Stock API: http://localhost:${PORT}/api/live-stock`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}/ws/stock`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`💰 Real-time Plan: ACTIVE - Using paid tier endpoints\n`);

  // Initialize cron jobs after server starts
  initializeCronJobs();
});
