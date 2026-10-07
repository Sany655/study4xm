const { verifyAamarPayCallback } = require('../../lib/aamarpay');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed.');

  try {
    return await verifyAamarPayCallback(req, res);
  } catch (error) {
    console.error('Could not handle AamarPay callback:', error);
    return res.status(500).send('Could not verify payment.');
  }
};
