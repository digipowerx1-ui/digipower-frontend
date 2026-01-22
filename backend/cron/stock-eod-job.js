/**
 * Stock EOD Job - Main orchestration logic for sending daily stock emails
 */

import { isMarketOpenToday } from './market-calendar.js';
import { getStockSubscribers } from '../services/strapi-service.js';
import { getStockDataForEmail } from '../services/stock-service.js';
import { sendStockCampaign, getMailchimpSubscribers } from '../services/mailchimp-service.js';
import { generateStockEODEmail } from '../templates/stock-eod-email.js';
import { logger } from '../utils/logger.js';

/**
 * Run the stock EOD job
 * Main entry point for the cron job
 * @param {Object} options - Job options
 * @param {boolean} options.dryRun - If true, don't actually send emails
 * @param {string} options.testEmail - If provided, send only to this email
 * @returns {Promise<Object>} - Job result
 */
export async function runStockEODJob(options = {}) {
  const { dryRun = process.env.DRY_RUN === 'true', testEmail = null } = options;

  logger.info('='.repeat(60));
  logger.info('Stock EOD Job Started');
  logger.info('='.repeat(60));

  if (dryRun) {
    logger.info('🔍 DRY RUN MODE - No emails will be sent');
  }

  try {
    // Step 1: Check if market was open today
    logger.info('Step 1: Checking market status...');

    if (!isMarketOpenToday()) {
      logger.info('Market is closed today (weekend or holiday) - Skipping job');
      return {
        skipped: true,
        reason: 'Market closed',
        timestamp: new Date().toISOString()
      };
    }

    logger.info('✓ Market was open today');

    // Step 2: Fetch stock data
    logger.info('Step 2: Fetching stock data...');

    const stockData = await getStockDataForEmail('DGXX');

    logger.info(`✓ Stock data retrieved:`);
    logger.info(`   Symbol: ${stockData.symbol}`);
    logger.info(`   Price: $${stockData.price}`);
    logger.info(`   Change: ${stockData.changePercent > 0 ? '+' : ''}${stockData.changePercent.toFixed(2)}%`);

    // Step 3: Fetch subscribers
    logger.info('Step 3: Fetching subscribers...');

    let subscribers;

    if (testEmail) {
      // Test mode: send to single email
      logger.info(`🧪 TEST MODE - Sending to ${testEmail} only`);
      subscribers = [{
        email: testEmail,
        firstName: 'Test',
        lastName: 'User'
      }];
    } else {
      // Production: try Strapi first, fallback to Mailchimp
      subscribers = await getStockSubscribers();

      if (subscribers.length === 0) {
        logger.info('No subscribers in Strapi, fetching from Mailchimp...');
        subscribers = await getMailchimpSubscribers();
      }
    }

    logger.info(`✓ Found ${subscribers.length} subscriber(s)`);

    if (subscribers.length === 0) {
      logger.warn('No subscribers found in Strapi or Mailchimp - Skipping send');
      return {
        skipped: true,
        reason: 'No subscribers',
        timestamp: new Date().toISOString()
      };
    }

    // Step 4: Generate email HTML
    logger.info('Step 4: Generating email content...');

    // Use first subscriber for template (Mailchimp will personalize per recipient)
    const htmlContent = generateStockEODEmail(stockData, subscribers[0]);

    logger.info(`✓ Email HTML generated (${htmlContent.length} characters)`);

    // Step 5: Send via Mailchimp
    if (dryRun) {
      logger.info('Step 5: DRY RUN - Email preview:');
      logger.info('-'.repeat(60));
      logger.info(htmlContent.substring(0, 500) + '...');
      logger.info('-'.repeat(60));

      return {
        dryRun: true,
        subscribers: subscribers.length,
        stockPrice: stockData.price,
        timestamp: new Date().toISOString()
      };
    }

    logger.info('Step 5: Sending campaign via Mailchimp...');

    const result = await sendStockCampaign(subscribers, stockData, htmlContent);

    logger.info(`✓ Campaign sent successfully!`);
    logger.info(`   Campaign ID: ${result.campaignId}`);
    logger.info(`   Recipients: ${result.subscriberCount}`);

    // Step 6: Log completion
    logger.info('='.repeat(60));
    logger.info('Stock EOD Job Completed Successfully');
    logger.info('='.repeat(60));

    return {
      success: true,
      campaignId: result.campaignId,
      subscriberCount: result.subscriberCount,
      stockData: {
        symbol: stockData.symbol,
        price: stockData.price,
        change: stockData.changePercent
      },
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    logger.error('='.repeat(60));
    logger.error('Stock EOD Job Failed');
    logger.error('='.repeat(60));
    logger.error('Error:', error.message);
    logger.error('Stack:', error.stack);

    // Send admin notification if configured
    if (process.env.ADMIN_ALERT_ON_ERROR === 'true') {
      await notifyAdmin({
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }

    throw error;
  }
}

/**
 * Send admin notification on job failure
 * @param {Object} errorDetails - Error information
 */
async function notifyAdmin(errorDetails) {
  logger.warn('Admin notification triggered');
  logger.warn('Error details:', errorDetails);

  // In production, you would send an email here
  // For now, we just log it
  // You could use Mailchimp transactional API or a simple SMTP service

  // Example implementation (commented out):
  /*
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await sendSimpleEmail(
      adminEmail,
      'Stock EOD Job Failed',
      `The stock EOD job failed with the following error:\n\n${errorDetails.error}\n\n${errorDetails.stack}`
    );
  }
  */
}
