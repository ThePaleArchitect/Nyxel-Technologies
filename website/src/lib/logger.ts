import pino from 'pino';

// Safely mock Sentry if the package or configuration is not fully present
let Sentry: any = null;
try {
  Sentry = require('@sentry/nextjs');
} catch (e) {
  // Sentry not installed or loaded
}

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
});

export function logError(error: Error, context?: Record<string, any>) {
  logger.error({ error: error.message, stack: error.stack, ...context }, 'Error logged');
  if (process.env.NODE_ENV === 'production' && Sentry && typeof Sentry.captureException === 'function') {
    try {
      Sentry.captureException(error, { extra: context });
    } catch (e) {
      // Ignore Sentry logging errors in fallback
    }
  }
}

export default logger;
