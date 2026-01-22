/**
 * Mailchimp Service - Send stock EOD campaigns via Mailchimp Marketing API
 */

import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';
import { logger } from '../utils/logger.js';
import { retryAsync } from '../utils/retry.js';

// Configure Mailchimp client (done lazily to ensure env vars are loaded)
function ensureMailchimpConfigured() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX || 'us19';

  if (!apiKey) {
    throw new Error('MAILCHIMP_API_KEY is not configured in environment variables');
  }

  // Only configure once
  if (!mailchimp.config || mailchimp.config.apiKey !== apiKey) {
    mailchimp.setConfig({
      apiKey: apiKey,
      server: server
    });
    logger.debug('Mailchimp client configured with server:', server);
  }
}

/**
 * Send stock campaign via Mailchimp Marketing API
 * Creates a campaign and sends it to the specified list/audience
 * @param {Array} subscribers - Array of subscriber objects
 * @param {Object} stockData - Stock data for the email
 * @param {string} htmlContent - HTML email content
 * @returns {Promise<Object>} - Campaign result with ID and status
 */
export async function sendStockCampaign(subscribers, stockData, htmlContent) {
  ensureMailchimpConfigured(); // Ensure Mailchimp is configured

  const listId = process.env.MAILCHIMP_LIST_ID;
  const adminEmail = process.env.ADMIN_EMAIL || 'investor@digipowerx.com';

  if (!listId) {
    throw new Error('MAILCHIMP_LIST_ID is not configured in environment variables');
  }

  logger.info('Creating Mailchimp campaign...');

  try {
    // Step 1: Create campaign
    const campaign = await retryAsync(async () => {
      return await mailchimp.campaigns.create({
        type: 'regular',
        recipients: {
          list_id: listId
        },
        settings: {
          subject_line: `DigiPowerX Stock Update - ${stockData.date}`,
          title: `Stock EOD ${stockData.date} - ${stockData.symbol}`,
          from_name: 'DigiPowerX Investor Relations',
          reply_to: adminEmail,
          to_name: '*|FNAME|*' // Mailchimp merge tag for first name
        }
      });
    });

    logger.info(`✓ Campaign created: ${campaign.id}`);

    // Step 2: Set campaign content
    await retryAsync(async () => {
      return await mailchimp.campaigns.setContent(campaign.id, {
        html: htmlContent
      });
    });

    logger.info('✓ Campaign content set');

    // Step 3: Send campaign
    await retryAsync(async () => {
      return await mailchimp.campaigns.send(campaign.id);
    });

    logger.info(`✓ Campaign sent successfully: ${campaign.id}`);

    return {
      success: true,
      campaignId: campaign.id,
      subscriberCount: subscribers.length
    };

  } catch (error) {
    logger.error('Mailchimp campaign failed:', error.message);

    // Log detailed error information
    if (error.response) {
      logger.error('Mailchimp API Error:', {
        status: error.response.status,
        text: error.response.text
      });
    }

    throw error;
  }
}

/**
 * Sync subscribers from Strapi to Mailchimp audience
 * Ensures Mailchimp has the latest subscriber list
 * @param {Array} subscribers - Array of subscriber objects from Strapi
 * @returns {Promise<Object>} - Sync result
 */
export async function syncSubscribersToMailchimp(subscribers) {
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!listId) {
    throw new Error('MAILCHIMP_LIST_ID is not configured');
  }

  logger.info(`Syncing ${subscribers.length} subscribers to Mailchimp...`);

  const results = {
    added: 0,
    updated: 0,
    failed: 0,
    errors: []
  };

  // Process in batches of 500 (Mailchimp batch operation limit)
  const batchSize = 500;

  for (let i = 0; i < subscribers.length; i += batchSize) {
    const batch = subscribers.slice(i, i + batchSize);

    const operations = batch.map(subscriber => ({
      method: 'PUT', // PUT will add or update
      path: `/lists/${listId}/members/${md5(subscriber.email.toLowerCase())}`,
      body: JSON.stringify({
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName || '',
          LNAME: subscriber.lastName || '',
          COMPANY: subscriber.company || ''
        },
        tags: ['stock-eod']
      })
    }));

    try {
      const batchResponse = await mailchimp.batches.start({ operations });
      logger.debug(`Batch ${Math.floor(i / batchSize) + 1} submitted: ${batchResponse.id}`);

      // Note: Batch operations are asynchronous in Mailchimp
      // You would need to poll for batch status to get actual results
      results.added += batch.length;

    } catch (error) {
      logger.error('Batch sync failed:', error.message);
      results.failed += batch.length;
      results.errors.push(error.message);
    }
  }

  logger.info(`Sync complete: ${results.added} added/updated, ${results.failed} failed`);

  return results;
}

/**
 * Add a single subscriber to Mailchimp (for testing)
 * @param {Object} subscriber - Subscriber object
 * @returns {Promise<Object>} - Result
 */
export async function addSubscriberToMailchimp(subscriber) {
  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!listId) {
    throw new Error('MAILCHIMP_LIST_ID is not configured');
  }

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscriber.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscriber.firstName || '',
        LNAME: subscriber.lastName || ''
      },
      tags: ['stock-eod']
    });

    logger.info(`✓ Added subscriber to Mailchimp: ${subscriber.email}`);

    return { success: true, id: response.id };

  } catch (error) {
    // If already exists, update instead
    if (error.status === 400 && error.response?.text?.includes('already a list member')) {
      logger.debug(`Subscriber already exists: ${subscriber.email}`);
      return { success: true, alreadyExists: true };
    }

    logger.error('Failed to add subscriber:', error.message);
    throw error;
  }
}

/**
 * Simple MD5 hash for Mailchimp subscriber ID
 * Mailchimp uses MD5 hash of lowercase email as subscriber ID
 * @param {string} email - Email address
 * @returns {string} - MD5 hash
 */
function md5(email) {
  return crypto.createHash('md5').update(email).digest('hex');
}

/**
 * Get campaign statistics
 * @param {string} campaignId - Campaign ID
 * @returns {Promise<Object>} - Campaign stats
 */
export async function getCampaignStats(campaignId) {
  try {
    const report = await mailchimp.reports.getCampaignReport(campaignId);

    return {
      emails_sent: report.emails_sent,
      opens: report.opens.opens_total,
      clicks: report.clicks.clicks_total,
      unsubscribed: report.unsubscribed
    };

  } catch (error) {
    logger.error('Failed to get campaign stats:', error.message);
    return null;
  }
}

/**
 * Get all subscribers from Mailchimp audience
 * Alternative to fetching from Strapi
 * @param {string} tag - Optional tag to filter subscribers (e.g., 'stock-eod')
 * @returns {Promise<Array>} - Array of subscriber objects
 */
export async function getMailchimpSubscribers(tag = null) {
  ensureMailchimpConfigured(); // Ensure Mailchimp is configured

  const listId = process.env.MAILCHIMP_LIST_ID;

  if (!listId) {
    throw new Error('MAILCHIMP_LIST_ID is not configured');
  }

  logger.info('Fetching subscribers from Mailchimp...');

  try {
    const subscribers = [];
    let offset = 0;
    const count = 1000; // Max per request

    while (true) {
      const response = await mailchimp.lists.getListMembersInfo(listId, {
        count,
        offset,
        status: 'subscribed' // Only get subscribed members
      });

      const members = response.members || [];

      // Filter by tag if specified
      let filteredMembers = members;
      if (tag) {
        filteredMembers = members.filter(member =>
          member.tags?.some(t => t.name === tag)
        );
      }

      // Extract subscriber info
      const pageSubscribers = filteredMembers.map(member => ({
        email: member.email_address,
        firstName: member.merge_fields?.FNAME || '',
        lastName: member.merge_fields?.LNAME || '',
        company: member.merge_fields?.COMPANY || ''
      }));

      subscribers.push(...pageSubscribers);

      logger.debug(`Fetched ${pageSubscribers.length} subscribers (offset: ${offset})`);

      // Check if we've fetched all
      if (members.length < count) {
        break;
      }

      offset += count;
    }

    logger.info(`✓ Retrieved ${subscribers.length} subscribers from Mailchimp`);
    return subscribers;

  } catch (error) {
    logger.error('Failed to fetch subscribers from Mailchimp:', error.message);
    throw error;
  }
}

/**
 * Test Mailchimp connection
 * @returns {Promise<boolean>} - True if connected successfully
 */
export async function testMailchimpConnection() {
  try {
    ensureMailchimpConfigured(); // Ensure Mailchimp is configured
    const response = await mailchimp.ping.get();
    logger.info('✓ Mailchimp connection successful:', response.health_status);
    return true;
  } catch (error) {
    logger.error('✗ Mailchimp connection failed:', error.message);
    return false;
  }
}
