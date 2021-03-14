const { Router } = require('express');
const https = require('https');
const InfoServices = require('../services/info.services');

const router = Router();

router.get('/latency', async (req, res) => {
  try {
    const start = Date.now();
    let latency = null;
    await https.get('https://google.com', () => {
      const end = Date.now();
      latency = end - start + ' ms';
      res.status(200).json({ latency });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
