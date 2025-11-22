# DigiPowerX Stock API

Node.js API server with WebSocket support for real-time stock data.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file with your API key:
```env
API_PORT=3000
MASSIVE_API_KEY=your_api_key_here
```

### 3. Start Development Servers

**Option A: Run API and Frontend Together** (Recommended)
```bash
# Terminal 1: Start API Server
npm run api

# Terminal 2: Start Vite Dev Server
npm run dev
```

**Option B: Quick Development with Mock Data**
```bash
export VITE_USE_API_MOCK=true && npm run dev
```

## 📡 API Endpoints

### HTTP Endpoints

#### GET `/api/live-stock`
Get real-time stock data for DGXX.

**Query Parameters:**
- `symbol` (optional): Stock symbol (default: "DGXX")

**Response:**
```json
{
  "symbol": "DGXX",
  "price": 3.35,
  "open": 3.35,
  "high": 3.35,
  "low": 3.35,
  "volume": 1820000,
  "previousClose": 3.21,
  "change": 0.14,
  "changePercent": 4.36,
  "lastUpdated": "2025-11-22T17:11:13.638Z",
  "source": "realtime"
}
```

#### GET `/api/stock`
Get historical stock data for a specific date.

**Query Parameters:**
- `date` (required): Date in format YYYY-MM-DD
- `symbol` (optional): Stock symbol (default: "DGXX")

**Response:**
```json
{
  "status": "OK",
  "symbol": "DGXX",
  "open": 24.15,
  "high": 25.1,
  "low": 23.9,
  "close": 24.5,
  "volume": 1820000,
  "afterHours": 24.6,
  "preMarket": 24.0,
  "date": "2025-11-22",
  "source": "polygon"
}
```

#### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-11-22T17:11:13.638Z"
}
```

### WebSocket

#### `ws://localhost:3000/ws/stock`
WebSocket endpoint for real-time stock updates (broadcasts every 30 seconds).

**Connect:**
```javascript
const ws = new WebSocket('ws://localhost:8080/ws/stock');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Stock update:', message.data);
};
```

**Subscribe to specific symbol:**
```javascript
ws.send(JSON.stringify({
  type: 'subscribe',
  symbol: 'DGXX'
}));
```

## 🔧 Frontend Integration

### Using Fetch API
```typescript
const response = await fetch('/api/live-stock');
const data = await response.json();
```

### Using WebSocket (Real-time Updates)
```typescript
import { useEffect, useState } from 'react';

function useStockWebSocket() {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/stock');

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'stock-update') {
        setStockData(message.data);
      }
    };

    return () => ws.close();
  }, []);

  return stockData;
}
```

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  Vite Dev       │  HTTP   │  Node.js API     │  HTTPS  │  Massive.com    │
│  (Port 8080)    │────────▶│  (Port 3000)     │────────▶│  API            │
│                 │  Proxy  │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
        │                            │
        │         WebSocket          │
        └────────────────────────────┘
               Real-time Updates
```

## 📦 Features

- ✅ Real-time stock data from Massive.com API
- ✅ WebSocket support for live updates
- ✅ Automatic data caching (30s TTL)
- ✅ Historical stock data by date
- ✅ CORS enabled for frontend integration
- ✅ Health check endpoint
- ✅ Error handling and logging
- ✅ Environment variable configuration

## 🔐 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `API_PORT` | Port for API server | No | 3000 |
| `MASSIVE_API_KEY` | Massive.com API key | Yes | - |
| `VITE_API_PROXY` | Custom proxy target | No | http://localhost:3000 |

## 📝 Development Notes

- The API server caches stock data for 30 seconds to reduce API calls
- WebSocket broadcasts updates every 30 seconds to all connected clients
- The Vite dev server proxies `/api` and `/ws` requests to the Node.js server
- Use mock mode (`VITE_USE_API_MOCK=true`) for quick frontend development without the API server

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is in use:
```bash
# Change port in .env
API_PORT=3001

# Update Vite proxy
VITE_API_PROXY=http://localhost:3001
```

### API Key Issues
Verify your `MASSIVE_API_KEY` is set correctly in `.env` and has access to the Massive.com API.

### WebSocket Connection Failed
- Ensure both servers are running
- Check that Vite proxy is configured for `/ws` path
- Verify no firewall is blocking the connection

## 🚀 Production Deployment

For production, deploy the API server separately (e.g., on Heroku, Railway, or DigitalOcean) and update your frontend to point to the production API URL:

```env
VITE_API_PROXY=https://your-api-domain.com
```
