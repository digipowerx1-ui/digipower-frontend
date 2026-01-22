/**
 * Test script to send stock email to specific test addresses
 * Run with: node backend/test-cron-send.js
 */

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
    logger.info('Test Email Send Started');
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
    logger.info('✓ Test emails sent successfully!');
    logger.info(`   Campaign ID: ${result.campaignId}`);
    logger.info(`   Recipients: ${result.subscriberCount}`);
    logger.info('='.repeat(60));
    logger.info('');
    logger.info('Test email addresses:');
    testSubscribers.forEach(sub => logger.info(`  - ${sub.email}`));
    logger.info('');

  } catch (error) {
    logger.error('='.repeat(60));
    logger.error('Test email send failed');
    logger.error('='.repeat(60));
    logger.error('Error:', error.message);
    logger.error('Stack:', error.stack);
    process.exit(1);
  }
}

// Run the test
sendTestEmails();
