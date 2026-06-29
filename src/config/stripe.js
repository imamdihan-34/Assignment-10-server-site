const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.warn('⚠️ Warning: STRIPE_SECRET_KEY not found in .env file');
  // Development এ dummy key দিয়ে চলতে দাও
  module.exports = require('stripe')('sk_test_dummy_for_dev');
} else {
  module.exports = require('stripe')(stripeKey);
}