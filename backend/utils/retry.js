/**
 * Retry utility with exponential backoff
 */

import { logger } from './logger.js';

/**
 * Retry an async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retry attempts (default: 3)
 * @param {number} delay - Initial delay in milliseconds (default: 1000)
 * @returns {Promise} - Result of the function
 */
export async function retryAsync(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) {
        // Last attempt failed, throw the error
        throw error;
      }

      const backoffDelay = delay * Math.pow(2, i);
      logger.warn(`Attempt ${i + 1} failed, retrying in ${backoffDelay}ms...`, error.message);

      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }
}
