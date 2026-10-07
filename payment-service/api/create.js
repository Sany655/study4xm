const { applyCors } = require('../lib/http');
const { createCheckout } = require('../lib/aamarpay');

module.exports = async function handler(req, res) {
  if (!applyCors(req, res, ['POST', 'OPTIONS'])) return;
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });

  try {
    return await createCheckout(req, res);
  } catch (error) {
    console.error('Could not create payment checkout:', error);
    return res.status(500).json({ message: 'Could not start checkout.' });
  }
};
