/**
 * Scheduled test cron job - sends at 10:45 AM IST
 * Run with: node backend/test-cron-scheduled.js
 * Keep this process running until the scheduled time
 */

import cron from 'node-cron';
import dotenv from 'dotenv';
import { getStockDataForEmail } from './services/stock-service.js';
import { sendStockCampaign } from './services/mailchimp-service.js';
import { generateStockEODEmail } from './templates/stock-eod-email.js';
import { logger } from './utils/logger.js';

// Load environment variables
dotenv.config();

// Test email addresses
const testSubscribers = [
  { email: 'midisofficial@gmail.com', firstName: 'Test', lastName: 'User 1' },
  { email: 'vijpurujit@gmail.com', firstName: 'Test', lastName: 'User 2' },
  { email: 'aitech620@gmail.com', firstName: 'Test', lastName: 'User 3' },
  { email: 'digipowerx1@gmail.com', firstName: 'Test', lastName: 'User 4' }
];

async function sendTestEmails() {
  try {
    logger.info('='.repeat(60));
    logger.info('🎯 SCHEDULED TEST EMAIL TRIGGERED AT 10:45 AM IST');
    logger.info('='.repeat(60));

    // Step 1: Fetch stock data
    logger.info('Fetching stock data...');
    const stockData = await getStockDataForEmail('DGXX');
    logger.info(`✓ Stock data fetched: $${stockData.price} (${stockData.changePercent}%)`);

    // Step 2: Generate email HTML
    logger.info('Generating email content...');
    const htmlContent = generateStockEODEmail(stockData, testSubscribers[0]);
    logger.info(`✓ Email HTML generated (${htmlContent.length} characters)`);

    // Step 3: Send via Mailchimp
    logger.info(`Sending to ${testSubscribers.length} test subscribers...`);
    const result = await sendStockCampaign(testSubscribers, stockData, htmlContent);

    logger.info('='.repeat(60));
    logger.info('✓ TEST EMAILS SENT SUCCESSFULLY AT 10:45 AM IST!');
    logger.info(`   Campaign ID: ${result.campaignId}`);
    logger.info(`   Recipients: ${result.subscriberCount}`);
    logger.info('='.repeat(60));
    logger.info('');
    logger.info('Test email addresses:');
    testSubscribers.forEach(sub => logger.info(`  - ${sub.email}`));
    logger.info('');

    // Exit after successful send
    logger.info('Job completed. Exiting...');
    process.exit(0);

  } catch (error) {
    logger.error('='.repeat(60));
    logger.error('TEST EMAIL SEND FAILED');
    logger.error('='.repeat(60));
    logger.error('Error:', error.message);
    logger.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Get current time
const now = new Date();
logger.info('='.repeat(60));
logger.info('Test Cron Job Scheduler Started');
logger.info('='.repeat(60));
logger.info(`Current time: ${now.toLocaleString()}`);
logger.info('Scheduled time: 10:45 AM (every day)');
logger.info('Timezone: Asia/Kolkata (IST)');
logger.info('');
logger.info('Test recipients:');
testSubscribers.forEach(sub => logger.info(`  - ${sub.email}`));
logger.info('');
logger.info('Waiting for scheduled time...');
logger.info('(Keep this process running)');
logger.info('='.repeat(60));

// Schedule for 10:45 AM IST every day
// Cron format: minute hour day month weekday
// 45 10 * * * = 10:45 AM every day
cron.schedule('45 10 * * *', async () => {
  await sendTestEmails();
}, {
  timezone: 'Asia/Kolkata'
});

// Keep the process alive
process.on('SIGINT', () => {
  logger.info('');
  logger.info('Cron job stopped by user.');
  process.exit(0);
});
