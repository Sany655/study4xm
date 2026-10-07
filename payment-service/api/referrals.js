const { applyCors } = require('../lib/http');
const { processReferral } = require('../lib/aamarpay');

module.exports = async function handler(req, res) {
  if (!applyCors(req, res, ['POST', 'OPTIONS'])) return;
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed.' });

  try {
    return await processReferral(req, res);
  } catch (error) {
    console.error('Could not process referral:', error);
    return res.status(500).json({ message: 'Could not process the referral code.' });
  }
};
