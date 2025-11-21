import { useState, useEffect, useRef, useCallback } from 'react';
import { websocketClient } from '@massive.com/client-js';

export interface StockTickData {
  ev: string; // Event type (e.g., "A" for aggregate second, "AM" for aggregate minute)
  sym: string; // Symbol
  v?: number; // Volume
  av?: number; // Accumulated volume
  op?: number; // Open price
  vw?: number; // Volume weighted average price
  o?: number; // Open price for this aggregate
  c?: number; // Close price
  h?: number; // High price
  l?: number; // Low price
  a?: number; // Average price
  s?: number; // Start timestamp (ms)
  e?: number; // End timestamp (ms)
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  lastUpdated: string;
  marketCap: string;
  weekHigh52: string;
  weekLow52: string;
  avgVolume: string;
  isRealData?: boolean; // Flag to indicate if this is real data or demo data
}

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

interface UseStockWebSocketOptions {
  apiKey: string;
  wsUrl: string;
  ticker: string;
  enabled?: boolean;
  useDemoFallback?: boolean; // If true, show demo data after fallback delay instead of leaving values blank
  fallbackDelayMs?: number; // Override fallback delay
  subscribeToSecondAggs?: boolean; // Subscribe to per-second aggregates (A.<TICKER>)
  subscribeToMinuteAggs?: boolean; // Subscribe to per-minute aggregates (AM.<TICKER>)
  refreshIntervalMs?: number; // Force periodic reconnects to keep the stream fresh
}

export const useStockWebSocket = ({
  apiKey,
  wsUrl,
  ticker,
  enabled = true,
  useDemoFallback = false,
  fallbackDelayMs,
  subscribeToSecondAggs = true,
  subscribeToMinuteAggs = true,
  refreshIntervalMs,
}: UseStockWebSocketOptions) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [rawMessages, setRawMessages] = useState<StockTickData[]>([]);
  const [hasLiveData, setHasLiveData] = useState(false);

  const wsRef = useRef<any>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const previousClosePrice = useRef<number | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const receivedTickersRef = useRef<Set<string>>(new Set());
  const messageCountRef = useRef(0);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;
  const FALLBACK_DELAY = fallbackDelayMs ?? 15000; // Wait longer before considering fallback

  const calculateChange = useCallback((currentPrice: number, openPrice: number) => {
    const change = currentPrice - openPrice;
    const changePercent = (change / openPrice) * 100;
    return { change, changePercent };
  }, []);

  const processStockMessage = useCallback((tickData: StockTickData) => {
    // Handle both 'A' (second aggregates) and 'AM' (minute aggregates)
    if ((tickData.ev === 'A' || tickData.ev === 'AM') && tickData.sym === ticker) {
      console.log('📊 Processing stock message for', ticker, tickData);

      const currentPrice = tickData.c || tickData.vw || 0;
      const openPrice = tickData.o || tickData.op || currentPrice;
      const { change, changePercent } = calculateChange(currentPrice, openPrice);

      // Store current price for next calculation
      if (previousClosePrice.current === null) {
        previousClosePrice.current = openPrice;
      }

      const newStockData = {
        symbol: tickData.sym,
        price: currentPrice,
        change,
        changePercent,
        volume: tickData.v || tickData.av || 0,
        high: tickData.h || currentPrice,
        low: tickData.l || currentPrice,
        open: openPrice,
        lastUpdated: new Date().toISOString(),
        // Static values - these would need separate API calls or different endpoints
        marketCap: '$450M',
        weekHigh52: '$32.15',
        weekLow52: '$18.40',
        avgVolume: '1.8M',
        isRealData: true, // Mark as real data from WebSocket
      };

      console.log('✅ Setting REAL stock data:', newStockData);
      setStockData(newStockData);
      setHasLiveData(true);
      setError(null);

      // Clear fallback timeout since we got real data
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }

      // Update previous close for next calculation
      previousClosePrice.current = currentPrice;
    }
  }, [ticker, calculateChange]);

  const setDemoData = useCallback(() => {
    console.warn('⚠️ No real data received, using DEMO data for', ticker);
    console.warn('⚠️ This is NOT real market data! Check if market is open or if ticker exists.');
    const demoData: StockData = {
      symbol: ticker,
      price: 3.21,
      change: -0.46,
      changePercent: -12.53,
      volume: 6135229,
      high: 3.75,
      low: 3.19,
      open: 3.67,
      lastUpdated: new Date().toISOString(),
      marketCap: '$450M',
      weekHigh52: '$32.15',
      weekLow52: '$18.40',
      avgVolume: '1.8M',
      isRealData: false, // Mark as demo data
    };
    setStockData(demoData);
    setHasLiveData(false);
  }, [ticker]);

  const connect = useCallback(() => {
    if (!enabled || wsRef.current) return;

    try {
      console.log('🔌 Connecting to WebSocket...', { wsUrl, ticker });
      setConnectionStatus('connecting');
      setError(null);
      setHasLiveData(false);

      // Create WebSocket client
      const ws = websocketClient(apiKey, wsUrl).stocks();
      console.log('✅ WebSocket client created');

      // Set a fallback timeout to show demo data if no real data arrives
      fallbackTimeoutRef.current = setTimeout(() => {
        console.log('⏱️ Fallback timeout reached, checking if we have data...');
        if (!stockData) {
          if (useDemoFallback) {
            setDemoData();
          } else {
            const friendly = `No live ${ticker} data received yet. Stream may be delayed, ticker may be unavailable, or market may be closed.`;
            console.warn('⚠️', friendly);
            setError(friendly);
            setHasLiveData(false);
          }
        }
      }, FALLBACK_DELAY);

      // Error handler
      ws.onerror = (err: any) => {
        console.error('WebSocket error:', err);
        setConnectionStatus('error');
        setError('Failed to connect to stock data stream');

        // Attempt reconnection
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            wsRef.current = null;
            connect();
          }, RECONNECT_DELAY);
        }
      };

      // Close handler
      ws.onclose = (code: number, reason: string) => {
        console.log('WebSocket closed:', code, reason);
        setConnectionStatus('disconnected');
        wsRef.current = null;

        // Attempt reconnection on unexpected close
        if (code !== 1000 && reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, RECONNECT_DELAY);
        }
      };

      // Message handler
      ws.onmessage = (msg: any) => {
        try {
          console.log('📨 Received WebSocket message:', msg.data);
          const parsedMessage = JSON.parse(msg.data);
          console.log('📝 Parsed message:', parsedMessage);

          // Handle status messages
          if (parsedMessage[0]?.ev === 'status') {
            console.log('📡 Status message:', parsedMessage[0]);
            if (parsedMessage[0].status === 'auth_success') {
              console.log('✅ WebSocket authenticated, subscribing to DGXX streams for', ticker);
              setConnectionStatus('connected');
              reconnectAttemptsRef.current = 0; // Reset reconnect attempts on success

              // Subscribe to both per-second (A) and per-minute (AM) aggregates for the target ticker.
              const subscriptions: string[] = [];
              if (subscribeToSecondAggs) subscriptions.push(`A.${ticker}`);
              if (subscribeToMinuteAggs) subscriptions.push(`AM.${ticker}`);

              if (subscriptions.length) {
                const subscribeMsg = {
                  action: 'subscribe',
                  params: subscriptions.join(',')
                };
                console.log('📤 Sending subscribe message:', subscribeMsg);
                ws.send(JSON.stringify(subscribeMsg));
              } else {
                console.warn('⚠️ No subscriptions configured for WebSocket.');
              }
            } else if (parsedMessage[0].status === 'max_connections') {
              const friendly = 'Maximum Massive.com websocket connections exceeded. Close other sessions or wait before reconnecting.';
              console.error('❌ WebSocket limit reached:', parsedMessage[0]);
              setConnectionStatus('error');
              setError(friendly);
              ws.close();
            } else if (parsedMessage[0].status === 'auth_failed') {
              console.error('❌ Authentication failed');
              setConnectionStatus('error');
              setError('Authentication failed');
            }
          }

          // Handle stock data messages (both 'A' for second aggregates and 'AM' for minute aggregates)
          if (Array.isArray(parsedMessage)) {
            parsedMessage.forEach((data: StockTickData) => {
              if (data.ev === 'A' || data.ev === 'AM') {
                messageCountRef.current += 1;

                // Track which tickers we're receiving
                if (!receivedTickersRef.current.has(data.sym)) {
                  receivedTickersRef.current.add(data.sym);
                  console.log(`📊 New ticker discovered: ${data.sym}`);
                  console.log(`📊 All received tickers so far:`, Array.from(receivedTickersRef.current).sort());
                }

                // Only process and store data for the requested ticker
                if (data.sym === ticker) {
                  console.log(`📊 ✅ Stock message for TARGET ${ticker}:`, data);
                  processStockMessage(data);
                  setRawMessages(prev => [...prev.slice(-99), data]); // Keep last 100 messages
                }
              }
            });

            // After 30 seconds, log summary if we haven't found our ticker
            if (messageCountRef.current === 100) {
              console.log(`📊 Summary after 100 messages:`);
              console.log(`   - Target ticker: ${ticker}`);
              console.log(`   - Received tickers:`, Array.from(receivedTickersRef.current).sort());
              console.log(`   - ${ticker} found: ${receivedTickersRef.current.has(ticker) ? 'YES ✅' : 'NO ❌'}`);
            }
          } else if (parsedMessage.ev === 'A' || parsedMessage.ev === 'AM') {
            // Some payloads may come as a single object instead of an array
            messageCountRef.current += 1;
            if (!receivedTickersRef.current.has(parsedMessage.sym)) {
              receivedTickersRef.current.add(parsedMessage.sym);
              console.log(`📊 New ticker discovered (object payload): ${parsedMessage.sym}`);
            }

            if (parsedMessage.sym === ticker) {
              processStockMessage(parsedMessage as StockTickData);
              setRawMessages(prev => [...prev.slice(-99), parsedMessage as StockTickData]);
            }
          }
        } catch (err) {
          console.error('❌ Error parsing WebSocket message:', err);
        }
      };

      wsRef.current = ws;
    } catch (err) {
      console.error('Error creating WebSocket:', err);
      setConnectionStatus('error');
      setError('Failed to initialize WebSocket connection');
    }
  }, [
    apiKey,
    wsUrl,
    ticker,
    enabled,
    processStockMessage,
    stockData,
    setDemoData,
    useDemoFallback,
    FALLBACK_DELAY,
    subscribeToSecondAggs,
    subscribeToMinuteAggs
  ]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }

    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }

    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (err) {
        console.error('Error closing WebSocket:', err);
      }
      wsRef.current = null;
    }

    setConnectionStatus('disconnected');
    setHasLiveData(false);
  }, []);

  const reconnect = useCallback(() => {
    disconnect();
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect, disconnect]);

  // Connect on mount and when dependencies change
  useEffect(() => {
    if (enabled) {
      connect();
      if (refreshIntervalMs) {
        console.log(`⏱️ Setting periodic WebSocket refresh every ${refreshIntervalMs}ms`);
        refreshIntervalRef.current = setInterval(() => {
          console.log('🔄 Periodic WebSocket refresh triggered');
          reconnect();
        }, refreshIntervalMs);
      }
    }

    return () => {
      disconnect();
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
    };
  }, [enabled, connect, disconnect, reconnect, refreshIntervalMs]);

  return {
    stockData,
    connectionStatus,
    error,
    rawMessages,
    isConnected: connectionStatus === 'connected',
    isConnecting: connectionStatus === 'connecting',
    hasLiveData,
    reconnect,
    disconnect,
  };
};
