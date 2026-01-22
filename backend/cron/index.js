/**
 * Cron Job Orchestrator
 * Initializes and manages all scheduled jobs
 */

import cron from 'node-cron';
import { runStockEODJob } from './stock-eod-job.js';
import { logger } from '../utils/logger.js';

/**
 * Initialize all cron jobs
 * Sets up scheduled tasks based on environment configuration
 */
export function initializeCronJobs() {
  const cronEnabled = process.env.CRON_ENABLED === 'true';

  if (!cronEnabled) {
    logger.info('⏸️  Cron jobs are disabled (CRON_ENABLED is not set to "true")');
    logger.info('   To enable, set CRON_ENABLED=true in your .env file');
    return;
  }

  logger.info('⚡ Initializing cron jobs...');

  const timezone = process.env.CRON_TIMEZONE || 'America/New_York';

  // Stock EOD Job - Runs at 6:00 PM EST, Monday-Friday
  // Cron format: minute hour day-of-month month day-of-week
  // 0 18 * * 1-5 = At 18:00 (6:00 PM), Monday through Friday
  const cronSchedule = '0 18 * * 1-5';

  const stockEODJob = cron.schedule(cronSchedule, async () => {
    logger.info('🔔 Cron trigger: Stock EOD job starting...');

    try {
      await runStockEODJob();
    } catch (error) {
      logger.error('Cron job execution failed:', error.message);
    }
  }, {
    scheduled: true,
    timezone: timezone
  });

  logger.info('✅ Cron jobs initialized successfully');
  logger.info(`   📅 Schedule: ${cronSchedule} (${timezone})`);
  logger.info('   📊 Stock EOD Job: Runs at 6:00 PM EST, Monday-Friday');
  logger.info('');
  logger.info('Next scheduled runs:');
  logger.info(`   - ${getNextCronDate(cronSchedule, timezone)}`);

  return {
    stockEODJob
  };
}

/**
 * Manually trigger the stock EOD job
 * Used for testing or manual execution via API endpoint
 * @param {Object} options - Job options
 * @returns {Promise<Object>} - Job result
 */
export async function triggerManual(options = {}) {
  logger.info('🔧 Manual trigger requested');

  if (options.dryRun) {
    logger.info('   Mode: DRY RUN');
  }

  if (options.testEmail) {
    logger.info(`   Test Email: ${options.testEmail}`);
  }

  return await runStockEODJob(options);
}

/**
 * Get the next scheduled run time for a cron expression
 * @param {string} schedule - Cron schedule expression
 * @param {string} timezone - Timezone
 * @returns {string} - Human-readable next run time
 */
function getNextCronDate(schedule, timezone) {
  // Simple approximation - for production, use a library like 'cron-parser'
  const now = new Date();
  const estNow = new Date(now.toLocaleString('en-US', { timeZone: timezone }));

  const nextRun = new Date(estNow);

  // If it's currently after 6 PM or a weekend, move to next weekday at 6 PM
  const currentHour = nextRun.getHours();
  const currentDay = nextRun.getDay();

  if (currentHour >= 18 || currentDay === 0 || currentDay === 6) {
    // Move to next day
    nextRun.setDate(nextRun.getDate() + 1);

    // Skip weekend
    while (nextRun.getDay() === 0 || nextRun.getDay() === 6) {
      nextRun.setDate(nextRun.getDate() + 1);
    }
  }

  // Set to 6:00 PM
  nextRun.setHours(18, 0, 0, 0);

  return nextRun.toLocaleString('en-US', {
    timeZone: timezone,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short'
  });
}

/**
 * Stop all running cron jobs (for graceful shutdown)
 * @param {Object} jobs - Object containing cron job instances
 */
export function stopCronJobs(jobs) {
  if (!jobs) return;

  logger.info('Stopping cron jobs...');

  if (jobs.stockEODJob) {
    jobs.stockEODJob.stop();
    logger.info('✓ Stock EOD job stopped');
  }
}
