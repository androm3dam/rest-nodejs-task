const User = require('../routes/models/User');
const Token = require('../routes/models/Token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config');

const UserServices = {
  signUp: async (params) => {
    const { email, phone, password } = params;

    const existing = await User.findById({ email, phone });

    if (existing) {
      throw new Error('User existing');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await new User({
      _id: { email, phone },
      password: hashedPassword,
    });
    await user.save();
  },

  login: async (params) => {
    const { email, phone, password } = params;

    const user = await User.findById({ email, phone });
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return null;
    }

    const token = jwt.sign({ userId: user.id }, jwtKey, {
      // expiresIn: 300,
      // dev
      expiresIn: '1h',
    });

    const newToken = await new Token({
      _id: token,
      user: JSON.stringify(user),
    });
    await newToken.save();

    await user.save();

    return token;
  },

  logout: async (query, auth) => {
    const { full } = query;
    const token = auth.split(' ')[1];

    if (full === 'true') {
      const tokenData = await Token.findById(token);
      await Token.deleteMany({ user: tokenData.user });
    } else {
      await Token.findByIdAndDelete(token);
    }
  },

  info: async (auth) => {
    const token = auth.split(' ')[1];
    const tokenData = await Token.findById(token);
    return JSON.parse(tokenData.user);
  },
};

module.exports = UserServices;
