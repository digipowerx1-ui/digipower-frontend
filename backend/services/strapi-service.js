/**
 * Strapi Service - Fetch subscribers from Strapi CMS
 */

import { logger } from '../utils/logger.js';
import { retryAsync } from '../utils/retry.js';

const STRAPI_API_URL = process.env.STRAPI_API_URL || 'https://thankful-miracle-1ed8bdfdaf.strapiapp.com/api';

/**
 * Fetch all subscribers who opted in for stock EOD updates
 * Handles pagination automatically
 * @returns {Promise<Array>} - Array of subscriber objects { email, firstName, lastName }
 */
export async function getStockSubscribers() {
  const subscribers = [];
  let page = 1;
  const pageSize = 100;

  logger.info('Fetching stock subscribers from Strapi...');

  try {
    while (true) {
      // Build URL with filters and pagination
      const url = `${STRAPI_API_URL}/email-alerts?` + new URLSearchParams({
        'filters[stockDetailEndOfDay][$eq]': 'true',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize
      });

      logger.debug(`Fetching page ${page} from Strapi...`);

      // Fetch with retry logic
      const response = await retryAsync(async () => {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Strapi API returned ${res.status}: ${res.statusText}`);
        }
        return res.json();
      });

      const data = response.data || [];

      logger.debug(`Strapi response structure:`, {
        hasData: !!response.data,
        dataLength: data.length,
        hasMeta: !!response.meta,
        firstItemStructure: data[0] ? Object.keys(data[0]) : 'no items'
      });

      // Extract and normalize subscriber data
      const pageSubscribers = data
        .filter(item => item && item.attributes && item.attributes.email) // Filter out invalid entries
        .map(item => ({
          email: item.attributes.email,
          firstName: item.attributes.firstName || '',
          lastName: item.attributes.lastName || '',
          company: item.attributes.company || ''
        }))
        .filter(sub => {
          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(sub.email);
        });

      subscribers.push(...pageSubscribers);

      logger.debug(`Page ${page}: Found ${pageSubscribers.length} subscribers`);

      // Check if we've reached the last page
      const pageCount = response.meta?.pagination?.pageCount || 1;
      if (page >= pageCount) {
        break;
      }

      page++;
    }

    logger.info(`✓ Retrieved ${subscribers.length} stock subscribers from Strapi`);
    return subscribers;

  } catch (error) {
    logger.error('Failed to fetch subscribers from Strapi:', error.message);
    throw error;
  }
}

/**
 * Get a single subscriber by email (for testing)
 * @param {string} email - Email address to search for
 * @returns {Promise<Object|null>} - Subscriber object or null if not found
 */
export async function getSubscriberByEmail(email) {
  try {
    const url = `${STRAPI_API_URL}/email-alerts?` + new URLSearchParams({
      'filters[email][$eq]': email,
      'filters[stockDetailEndOfDay][$eq]': 'true'
    });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Strapi API returned ${response.status}`);
    }

    const json = await response.json();
    const data = json.data || [];

    if (data.length === 0) {
      return null;
    }

    return {
      email: data[0].attributes.email,
      firstName: data[0].attributes.firstName || '',
      lastName: data[0].attributes.lastName || ''
    };

  } catch (error) {
    logger.error('Failed to fetch subscriber by email:', error.message);
    return null;
  }
}
