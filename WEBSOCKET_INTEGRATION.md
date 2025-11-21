# WebSocket Integration for Real-Time Stock Data

## Overview
This document describes the WebSocket integration that provides real-time stock data streaming for the DigiPowerX frontend application.

## Architecture

### 1. Custom React Hook: `useStockWebSocket`
**Location:** `src/hooks/useStockWebSocket.ts`

This hook manages the WebSocket connection to Massive.com's stock data API and provides real-time stock updates.

#### Features:
- **Automatic Connection Management:** Connects on mount, disconnects on unmount
- **Auto-Reconnection:** Attempts up to 5 reconnections with 3-second delays
- **Connection Status Tracking:** `connecting`, `connected`, `disconnected`, `error`
- **Real-time Data Processing:** Parses incoming stock tick data and calculates price changes
- **Error Handling:** Comprehensive error handling with user-friendly error messages

#### Interface:
```typescript
interface StockData {
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
}

interface UseStockWebSocketOptions {
  apiKey: string;
  wsUrl: string;
  ticker: string;
  enabled?: boolean;
}
```

#### Usage:
```typescript
const {
  stockData,
  connectionStatus,
  error,
  isConnected,
  isConnecting,
  reconnect,
  disconnect,
} = useStockWebSocket({
  apiKey: 'YOUR_API_KEY',
  wsUrl: 'wss://delayed.massive.com',
  ticker: 'DGXX',
  enabled: true,
});
```

### 2. Integration Points

#### Investor Relations Page
**Location:** `src/pages/Investor.tsx`

**Changes:**
- Replaced polling-based API calls with WebSocket hook
- Added real-time connection status indicator with "LIVE" badge
- Shows green badge when connected, red badge with reconnect button on error
- Updated subtitle to mention "real-time WebSocket streaming"
- Displays live stock price, change, volume, high, low, and open values

**Features:**
- Live price updates as they come through the WebSocket
- Connection status indicator (green "LIVE" badge)
- Click-to-reconnect functionality on connection errors
- Real-time price change indicators (▲/▼)

#### Stock Information Page
**Location:** `src/pages/StockInformation.tsx`

**Changes:**
- Integrated WebSocket hook for live stock data
- Updated all 6 stock cards with real-time data:
  - Current Price (with connection status)
  - Price Change
  - Volume
  - Today's High
  - Today's Low
  - Open Price
- Added connection status badge to the main price card
- Updated chart legend with live "Last Updated" timestamp
- Updated page subtitle to mention "Real-time WebSocket streaming"

**Features:**
- Real-time updates for all stock metrics
- Connection status indicator on the price card
- Graceful fallback to "--" when data is not yet available
- Loading states while connecting

### 3. Connection Status Indicators

Both pages now include visual indicators for the WebSocket connection state:

- **Connected (Green):**
  ```
  [🟢 Wifi Icon] LIVE
  ```
  Shows when WebSocket is actively connected and receiving data

- **Error/Disconnected (Red):**
  ```
  [🔴 WifiOff Icon] OFFLINE
  ```
  Shows when connection fails or is lost
  Clickable button that triggers reconnection attempt

### 4. Data Flow

```
┌─────────────────┐
│  Massive.com    │
│  WebSocket API  │
└────────┬────────┘
         │ wss://delayed.massive.com
         │
         v
┌─────────────────────────┐
│  useStockWebSocket Hook │
│  - Authentication       │
│  - Subscribe to DGXX    │
│  - Parse messages       │
│  - Calculate changes    │
└────────┬────────────────┘
         │
         ├────────────────────┐
         │                    │
         v                    v
┌────────────────┐    ┌──────────────────┐
│  Investor.tsx  │    │  StockInfo.tsx   │
│  - Live banner │    │  - Stock cards   │
│  - Chart data  │    │  - Live metrics  │
└────────────────┘    └──────────────────┘
```

## Configuration

### WebSocket Connection
- **API Key:** `YkYoy5TFxWSGWgO6cZmX57tjyBWSzb2p`
- **WebSocket URL:** `wss://delayed.massive.com`
- **Ticker Symbol:** `DGXX` (but subscribes to all tickers with `A.*`)
- **Update Frequency:** Per-second aggregates (using `A.*` channel)

### Reconnection Settings
- **Max Attempts:** 5
- **Delay Between Attempts:** 3000ms (3 seconds)
- **Fallback Timeout:** 10000ms (10 seconds) - Shows demo data if no real data arrives

## Message Format

The WebSocket receives messages in this format for **second aggregates**:

```json
[
  {
    "ev": "A",
    "sym": "DGXX",
    "v": 1234567,
    "av": 1234567,
    "op": 3.50,
    "vw": 3.52,
    "o": 3.51,
    "c": 3.52,
    "h": 3.55,
    "l": 3.48,
    "a": 3.52,
    "s": 1234567890000,
    "e": 1234567891000
  }
]
```

Where:
- `ev`: Event type ("A" = Aggregate Second, "AM" = Aggregate Minute)
- `sym`: Stock symbol
- `v`: Volume
- `av`: Accumulated volume
- `op`: Opening price
- `vw`: Volume weighted average price
- `o`: Open price for this aggregate
- `c`: Close price
- `h`: High price
- `l`: Low price
- `a`: Average price
- `s`: Start timestamp (ms)
- `e`: End timestamp (ms)

## Benefits Over Previous Polling Implementation

1. **Per-Second Updates:** Data updates every second instead of waiting for 5-minute polling intervals
2. **Extremely Low Latency:** Stock prices appear within 1 second of market changes
3. **Reduced Server Load:** No repeated HTTP requests every 5 minutes
4. **Persistent Connection:** WebSocket maintains connection with minimal overhead
5. **Better User Experience:** Live badge shows connection status in real-time
6. **Automatic Reconnection:** Handles network issues gracefully with auto-retry
7. **Smart Fallback:** Shows demo data if no real data arrives within 10 seconds
8. **More Efficient:** Only sends data when it changes, not on a fixed schedule

## Future Enhancements

1. **Historical Data Integration:** Stream historical tick data for charting
2. **Multiple Tickers:** Subscribe to multiple stock symbols simultaneously
3. **Custom Alerts:** Trigger notifications based on price thresholds
4. **WebSocket Metrics:** Track connection uptime, message rates, and data freshness
5. **Fallback Mechanism:** Automatically fall back to polling if WebSocket fails repeatedly

## Testing

To test the WebSocket integration:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to either page:**
   - `/investor` - Investor Relations page
   - `/stock-information` - Stock Information page

3. **Verify the following:**
   - Green "LIVE" badge appears when connected
   - Stock data updates in real-time
   - Price changes reflect immediately
   - Connection survives page navigation
   - Reconnection works after network interruption

4. **Test edge cases:**
   - Disable network and verify "OFFLINE" badge appears
   - Re-enable network and click reconnect button
   - Navigate between pages and verify connection persists

## Dependencies

- `@massive.com/client-js` - WebSocket client library for Massive.com API
- React 18+ - For hooks and component state management
- TypeScript - For type safety

## Troubleshooting

### Connection Issues
- Verify the API key is correct
- Check WebSocket URL is accessible
- Ensure firewall/proxy allows WebSocket connections
- Check browser console for error messages

### Data Not Updating
- Verify ticker symbol is correct ("DGXX")
- Check connection status badge
- Look for authentication errors in console
- Confirm market is open (if using real-time data)

### Performance Issues
- Monitor browser DevTools Network tab for message frequency
- Check for memory leaks with React DevTools Profiler
- Verify reconnection logic isn't creating multiple connections
