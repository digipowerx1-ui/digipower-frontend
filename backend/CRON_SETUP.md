# Stock EOD Email Cron Job - Setup Guide

This guide will help you set up and test the automated stock end-of-day email system.

## Overview

A cron job that automatically sends DigiPowerX stock information to Mailchimp subscribers every weekday at 6:00 PM EST (after market close and after-hours trading).

## Prerequisites

Before you begin, you need:

1. **Mailchimp Account** with Marketing API access
2. **Mailchimp API Credentials**:
   - API Key
   - Server Prefix (e.g., us19)
   - Audience/List ID
3. **Strapi Access** (already configured)
4. **Massive.com API Key** (already configured)

---

## Step 1: Get Mailchimp Credentials

### 1.1 Get API Key
1. Log in to your Mailchimp account
2. Go to **Account → Extras → API Keys**
3. Click **Create A Key**
4. Copy the generated API key

### 1.2 Get Server Prefix
- Look at your Mailchimp dashboard URL
- Example: `https://us19.admin.mailchimp.com/`
- The server prefix is `us19` (the part before `.admin.mailchimp.com`)

### 1.3 Get Audience/List ID
1. Go to **Audience → All contacts**
2. Click **Settings**
3. Scroll to **Audience ID** or **List ID**
4. Copy the ID (looks like: `a1b2c3d4e5`)

---

## Step 2: Configure Environment Variables

Edit your `backend/.env` file and add:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_actual_api_key_here
MAILCHIMP_SERVER_PREFIX=us19
MAILCHIMP_LIST_ID=your_actual_list_id_here

# Strapi (already configured)
STRAPI_API_URL=https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api

# Cron Configuration
CRON_ENABLED=true
CRON_TIMEZONE=America/New_York
DRY_RUN=false

# Admin Configuration
ADMIN_EMAIL=your_email@digipowerx.com
ADMIN_ALERT_ON_ERROR=true

# Testing
CRON_API_KEY=generate_a_secure_random_string_here
```

### Generate a Secure API Key

Run this in your terminal to generate a random API key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 3: Install Dependencies

Dependencies are already installed. If needed, run:

```bash
cd backend
npm install
```

---

## Step 4: Test the System

### 4.1 Test with Dry Run (No Emails Sent)

This will run the entire job but won't send any emails:

```bash
curl -X POST http://localhost:3000/api/cron/stock-eod/trigger?dryRun=true \
  -H "x-api-key: your_CRON_API_KEY_here"
```

**Expected output:**
- Stock data fetched successfully
- Subscribers retrieved from Strapi
- Email HTML generated
- "DRY RUN mode - email not sent"

### 4.2 Test with Your Email Only

Send a real email to yourself for testing:

```bash
curl -X POST "http://localhost:3000/api/cron/stock-eod/trigger?testEmail=your_email@example.com" \
  -H "x-api-key: your_CRON_API_KEY_here"
```

**Expected:**
- You should receive the stock EOD email within a few minutes
- Check spam folder if not in inbox

### 4.3 Check the Email

Verify:
- ✅ Subject: "DigiPowerX Stock Update - [Today's Date]"
- ✅ Stock data is accurate and current
- ✅ Email is well-formatted on desktop and mobile
- ✅ Unsubscribe link works
- ✅ All metrics displayed correctly

---

## Step 5: Sync Subscribers to Mailchimp (Optional but Recommended)

Before going live, ensure your Mailchimp audience has the subscribers from Strapi:

**Option A: Manual Import**
1. Export subscribers from Strapi where `stockDetailEndOfDay=true`
2. Import to Mailchimp audience
3. Add tag "stock-eod" to imported contacts

**Option B: Automatic Sync** (recommended)
The system will handle this automatically when you enable the cron job.

---

## Step 6: Enable Automated Cron Job

Once testing is successful:

1. Set `CRON_ENABLED=true` in `.env`
2. Restart your backend server:

```bash
npm start
```

3. Check the logs for:
```
✅ Cron jobs initialized successfully
📅 Schedule: 0 18 * * 1-5 (America/New_York)
📊 Stock EOD Job: Runs at 6:00 PM EST, Monday-Friday
```

---

## Schedule Details

- **Time**: 6:00 PM EST / 3:00 PM PST
- **Days**: Monday - Friday only
- **Automatically skips**:
  - Weekends (Saturday, Sunday)
  - US stock market holidays (NYSE calendar)

### Holiday Calendar

The system checks against NYSE holidays in [backend/config/holidays.json](backend/config/holidays.json).

**Important:** Update this file annually with new year's holidays!

---

## Monitoring

### Check Logs

Watch for cron execution:

```bash
# In your backend directory
tail -f logs/cron.log  # If using file logging
# Or just watch the console output
```

### Mailchimp Dashboard

1. Go to **Campaigns** in Mailchimp
2. You'll see each sent campaign: "Stock EOD [Date] - DGXX"
3. Click to view:
   - Total sent
   - Open rate
   - Click rate
   - Unsubscribes

---

## Troubleshooting

### Emails Not Sending

**Check 1: Mailchimp API Key**
```bash
# Test Mailchimp connection
curl -X POST http://localhost:3000/api/cron/stock-eod/trigger?dryRun=true \
  -H "x-api-key: your_key"
```

If you see "Mailchimp API Error", your credentials are incorrect.

**Check 2: No Subscribers**
- Verify Strapi has subscribers with `stockDetailEndOfDay=true`
- Visit: https://thankful-miracle-1ed8bdfdaf.strapiapp.com/admin
- Check the `email-alerts` collection

**Check 3: Cron Not Running**
- Ensure `CRON_ENABLED=true` in `.env`
- Check server logs for "Cron jobs initialized"
- Verify timezone is correct

### Wrong Timezone

If emails send at the wrong time:

1. Check `CRON_TIMEZONE=America/New_York` in `.env`
2. Verify your server's system timezone:
   ```bash
   date
   ```

### Sending on Holidays

If emails sent on a market holiday:

1. Update [backend/config/holidays.json](backend/config/holidays.json)
2. Restart the server

---

## Manual Triggers

### Trigger Now (Production)

```bash
curl -X POST http://localhost:3000/api/cron/stock-eod/trigger \
  -H "x-api-key: your_CRON_API_KEY"
```

### Trigger with Dry Run

```bash
curl -X POST http://localhost:3000/api/cron/stock-eod/trigger?dryRun=true \
  -H "x-api-key: your_CRON_API_KEY"
```

### Trigger with Test Email

```bash
curl -X POST "http://localhost:3000/api/cron/stock-eod/trigger?testEmail=test@example.com" \
  -H "x-api-key: your_CRON_API_KEY"
```

---

## Production Checklist

Before going live:

- [ ] All environment variables configured in `.env`
- [ ] Mailchimp API credentials verified
- [ ] Test email sent and received successfully
- [ ] Dry run completed without errors
- [ ] Subscribers synced to Mailchimp
- [ ] `CRON_ENABLED=true` set
- [ ] Server restarted
- [ ] Logs monitored for first automated run
- [ ] Email template looks good on mobile and desktop
- [ ] Unsubscribe link tested and working

---

## Next Steps

After successful deployment:

1. **Monitor for 1 week**
   - Check daily execution logs
   - Track open/click rates in Mailchimp
   - Monitor unsubscribe rate (<5% is healthy)

2. **Update Holiday Calendar Annually**
   - Add new year's NYSE holidays to `config/holidays.json`

3. **Consider Enhancements**
   - Add stock chart image to email
   - Include historical performance comparison
   - A/B test different subject lines
   - Add weekly digest option

---

## Support

If you encounter issues:

1. Check the logs for error messages
2. Verify all environment variables are set
3. Test Mailchimp connection with dry run
4. Ensure Strapi has subscribers with `stockDetailEndOfDay=true`

For questions about the code, refer to the implementation files in:
- `backend/cron/` - Cron job logic
- `backend/services/` - API integrations
- `backend/templates/` - Email templates
- `backend/utils/` - Utilities

---

## File Structure

```
backend/
├── cron/
│   ├── index.js                # Cron orchestrator
│   ├── stock-eod-job.js        # Main job logic
│   └── market-calendar.js      # Holiday detection
├── services/
│   ├── strapi-service.js       # Fetch subscribers
│   ├── stock-service.js        # Fetch stock data
│   └── mailchimp-service.js    # Send campaigns
├── templates/
│   └── stock-eod-email.js      # Email HTML generator
├── utils/
│   ├── logger.js               # Logging
│   └── retry.js                # Retry logic
├── config/
│   └── holidays.json           # NYSE holidays
└── index.js                     # Main server (modified)
```

---

Good luck! 🚀
