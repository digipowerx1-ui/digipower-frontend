/**
 * Market Calendar - NYSE Holiday Detection
 * Checks if the US stock market is open on a given date
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let holidaysCache = null;

/**
 * Load NYSE holidays from config file
 * @returns {Object} - Holiday calendar by year
 */
function loadHolidays() {
  if (holidaysCache) {
    return holidaysCache;
  }

  try {
    const holidaysPath = join(__dirname, '../config/holidays.json');
    const holidaysData = readFileSync(holidaysPath, 'utf8');
    holidaysCache = JSON.parse(holidaysData);
    return holidaysCache;
  } catch (error) {
    logger.error('Failed to load holidays.json:', error.message);
    return {};
  }
}

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if a given date is a weekday (Monday-Friday)
 * @param {Date} date - Date to check
 * @returns {boolean} - True if weekday
 */
function isWeekday(date) {
  const day = date.getDay();
  return day >= 1 && day <= 5; // Monday = 1, Friday = 5
}

/**
 * Check if a given date is a market holiday
 * @param {Date} date - Date to check
 * @returns {boolean} - True if market holiday
 */
function isMarketHoliday(date) {
  const dateStr = formatDate(date);
  const year = date.getFullYear().toString();
  const holidays = loadHolidays();

  if (!holidays[year]) {
    logger.warn(`No holiday data for year ${year} - assuming not a holiday`);
    return false;
  }

  return holidays[year].includes(dateStr);
}

/**
 * Check if the market is open on a given date
 * Market is open if it's a weekday AND not a holiday
 * @param {Date} date - Date to check (defaults to today)
 * @returns {boolean} - True if market is open
 */
export function isMarketOpenToday(date = new Date()) {
  if (!isWeekday(date)) {
    logger.debug('Market closed - weekend');
    return false;
  }

  if (isMarketHoliday(date)) {
    logger.debug('Market closed - holiday:', formatDate(date));
    return false;
  }

  return true;
}

/**
 * Get the next trading day from a given date
 * @param {Date} date - Starting date (defaults to today)
 * @returns {Date} - Next trading day
 */
export function getNextTradingDay(date = new Date()) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);

  // Keep incrementing until we find a trading day (max 10 days to prevent infinite loop)
  let attempts = 0;
  while (!isMarketOpenToday(nextDay) && attempts < 10) {
    nextDay.setDate(nextDay.getDate() + 1);
    attempts++;
  }

  return nextDay;
}

/**
 * Get today's date in EST/EDT timezone
 * @returns {Date} - Current date in EST
 */
export function getTodayInEST() {
  // Get current time in EST
  const estDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });
  return new Date(estDate);
}
