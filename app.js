const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { PORT, mongoDB } = require('./config');

const app = express();

app.use(express.json({ extended: true }));
app.use(cors());
app.use('', require('./routes/auth.routes'));
app.use('', require('./routes/info.routes'));

async function start() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => {
      console.log(`app has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log('Server error: ', e.message);
    process.exit(1);
  }
}

start();
