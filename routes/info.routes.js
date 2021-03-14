const { Router } = require('express');
const https = require('https');
const auth = require('./middleware/auth.middleware');
const UserServices = require('../services/user.services');

const router = Router();

router.get('/latency', auth, async (req, res) => {
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

router.get('/info', auth, async (req, res) => {
  try {
    const info = await UserServices.info(req.headers.authorization);
    res.status(200).json(info._id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
