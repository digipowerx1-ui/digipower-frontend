/**
 * Quick test script to debug Massive.com API issues
 */

import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.MASSIVE_API_KEY;
const symbol = 'DGXX';

console.log('\n=== Testing Massive.com API ===\n');
console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
console.log('Symbol:', symbol);
console.log('\n');

if (!apiKey) {
  console.error('❌ MASSIVE_API_KEY is not set in .env file');
  process.exit(1);
}

// Get yesterday's date (more likely to have data)
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];

// Test each endpoint
const endpoints = {
  snapshot: `https://api.massive.com/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${apiKey}`,
  quote: `https://api.massive.com/v3/quotes/${symbol}?limit=1&order=desc&apiKey=${apiKey}`,
  trade: `https://api.massive.com/v3/trades/${symbol}?limit=1&order=desc&apiKey=${apiKey}`,
  daily: `https://api.massive.com/v1/open-close/${symbol}/${yesterdayStr}?adjusted=true&apiKey=${apiKey}`
};

async function testEndpoint(name, url) {
  try {
    console.log(`Testing ${name}...`);
    const response = await fetch(url);

    console.log(`  Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`  ✓ Success! Data keys:`, Object.keys(data).join(', '));

      // Show a preview of the data
      if (name === 'snapshot' && data.ticker) {
        console.log(`    Price: $${data.ticker.day?.c || data.ticker.lastTrade?.p || 'N/A'}`);
      } else if (name === 'quote' && data.results?.[0]) {
        console.log(`    Ask Price: $${data.results[0].ask_price || 'N/A'}`);
      } else if (name === 'trade' && data.results?.[0]) {
        console.log(`    Trade Price: $${data.results[0].price || 'N/A'}`);
      } else if (name === 'daily') {
        console.log(`    Close: $${data.close || 'N/A'}`);
      }
    } else {
      const text = await response.text();
      console.log(`  ✗ Failed`);
      console.log(`    Response:`, text.substring(0, 200));
    }
  } catch (error) {
    console.log(`  ✗ Error: ${error.message}`);
  }
  console.log('');
}

async function runTests() {
  for (const [name, url] of Object.entries(endpoints)) {
    await testEndpoint(name, url);
  }

  console.log('=== Test Complete ===\n');
}

runTests().catch(console.error);
