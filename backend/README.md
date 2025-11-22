# DigiPowerX Stock API Backend

Real-time stock data API server with WebSocket support for DGXX stock information.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
API_PORT=3000
MASSIVE_API_KEY=your_api_key_here
NODE_ENV=development
```

### 3. Start Server
```bash
npm start
# or for development
npm run dev
```

The server will start on `http://localhost:3000`

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
WebSocket endpoint for real-time stock updates.

**Connect:**
```javascript
const ws = new WebSocket('ws://your-api-domain.com/ws/stock');

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Stock update:', message.data);
};
```

**Message Format:**
```json
{
  "type": "stock-update",
  "data": {
    "symbol": "DGXX",
    "price": 3.35,
    "change": 0.14,
    "changePercent": 4.36,
    ...
  }
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `API_PORT` | Port for API server | No | 3000 |
| `MASSIVE_API_KEY` | Massive.com API key | Yes | - |
| `NODE_ENV` | Environment (development/production) | No | development |

### Performance Settings

**Cache TTL:** 5 seconds (configurable in `index.js` line 21)
**WebSocket Broadcast:** Every 5 seconds (configurable in `index.js` line 273)

To adjust for different latency requirements:
```javascript
// Lower latency (1-2 seconds)
ttl: 2000

// Standard (5 seconds) - Recommended
ttl: 5000

// Lower API usage (30 seconds)
ttl: 30000
```

## 🚀 Deployment

### Deploy to Railway

1. Install Railway CLI:
```bash
npm install -g @railway/cli
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Add environment variables in Railway dashboard:
   - `MASSIVE_API_KEY`
   - `NODE_ENV=production`

### Deploy to Heroku

1. Create Heroku app:
```bash
heroku create digipowerx-api
```

2. Set environment variables:
```bash
heroku config:set MASSIVE_API_KEY=your_key
heroku config:set NODE_ENV=production
```

3. Deploy:
```bash
git push heroku main
```

### Deploy to DigitalOcean App Platform

1. Create new app from GitHub repository
2. Set build command: `npm install`
3. Set run command: `npm start`
4. Add environment variables in dashboard
5. Deploy!

### Deploy to AWS (EC2)

1. Launch EC2 instance (Ubuntu 22.04)
2. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. Clone and setup:
```bash
git clone your-repo
cd backend
npm install
```

4. Create `.env` file with your credentials

5. Use PM2 for process management:
```bash
sudo npm install -g pm2
pm2 start index.js --name digipowerx-api
pm2 startup
pm2 save
```

6. Setup Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name api.digipowerx.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /ws {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header Host $host;
    }
}
```

## 📦 Dependencies

- **express** (^5.1.0) - Web framework
- **cors** (^2.8.5) - CORS middleware
- **ws** (^8.18.3) - WebSocket library
- **dotenv** (^17.2.3) - Environment variable management

## 🔐 Security

- CORS is enabled for all origins (configure for production)
- API key is stored in environment variables
- No rate limiting (add for production)
- No authentication (add if needed)

### Production Security Checklist

- [ ] Configure CORS for specific origins
- [ ] Add rate limiting (express-rate-limit)
- [ ] Add API authentication
- [ ] Enable HTTPS/WSS
- [ ] Add input validation
- [ ] Set up monitoring and logging
- [ ] Configure firewall rules

## 🧪 Testing

Test the API:
```bash
# Health check
curl http://localhost:3000/api/health

# Live stock data
curl http://localhost:3000/api/live-stock

# Historical data
curl http://localhost:3000/api/stock?date=2025-11-22
```

## 📊 Monitoring

Add monitoring in production:
```bash
npm install express-status-monitor
```

Then add to `index.js`:
```javascript
import expressStatusMonitor from 'express-status-monitor';
app.use(expressStatusMonitor());
```

Access dashboard at: `http://your-api/status`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

### WebSocket Connection Failed
- Ensure firewall allows WebSocket connections
- Check if proxy supports WebSocket upgrade
- Verify CORS settings

### API Key Issues
- Verify `MASSIVE_API_KEY` is set in `.env`
- Check API key has proper permissions
- Ensure API key hasn't expired

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Support

For issues and questions:
- GitHub Issues: [Your Repo URL]
- Email: support@digipowerx.com
