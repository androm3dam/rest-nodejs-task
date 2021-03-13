const { Router, request } = require('express');
const UserServices = require('../services/user.services');
const auth = require('./middleware/auth.middleware');
const router = Router();
const https = require('https');

router.post('/signup', async (req, res) => {
  const time = Date.now();
  console.log(time);
  try {
    /* https.get('https://google.com', () => {
      console.log('got it');
      const time2 = Date.now();
      console.log(time2 - time + ' ms');
    }); */
    const params = req.body;
    await UserServices.signUp(params);
    const token = await UserServices.login(params);
    res.json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await UserServices.login(req.body);

    if (token) {
      return res.json({ token });
    }
    res.status(400).json({ message: 'Incorrect data' });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.get('/logout', auth, async (req, res) => {
  await UserServices.logout(req.query, req.headers.authorization);
  res.status(200).json({ message: 'ok' });
});

module.exports = router;
