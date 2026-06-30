import logger from './logger';

let StripeClass: any = null;
try {
  StripeClass = require('stripe');
} catch (e) {
  // Stripe not installed
}

let stripe: any = null;
const secretKey = process.env.STRIPE_SECRET_KEY;

if (secretKey && secretKey.startsWith('sk_') && StripeClass) {
  try {
    stripe = new StripeClass(secretKey, {
      apiVersion: '2024-06-20', // standard stable version
    });
    logger.info('Stripe client initialized');
  } catch (error) {
    logger.error({ error }, 'Failed to initialize Stripe client');
  }
} else {
  logger.warn('STRIPE_SECRET_KEY is not configured or Stripe package is missing. Fallback payment system enabled.');
}

export { stripe };
