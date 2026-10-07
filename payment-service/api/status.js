const { applyCors } = require('../lib/http');
const { checkPaymentStatus } = require('../lib/aamarpay');

module.exports = async function handler(req, res) {
  if (!applyCors(req, res, ['GET', 'OPTIONS'])) return;
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed.' });

  try {
    return await checkPaymentStatus(req, res);
  } catch (error) {
    console.error('Could not check payment status:', error);
    return res.status(500).json({ message: 'Could not verify your account or payment status.' });
  }
};
