const User = require('../models/user');
const generateToken = require('../middleware/auth').generateAccessToken;
const AuthValidation = require('../validators/auth.js');
const Helpers = require('../utils/Helpers');

const Auth = {};

Auth.Register = async (req, res, next) => {
  try {
    const { errors, isValid } = AuthValidation(req.body);
    const { username, password } = req.body;
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let user = await User.findOne({ username });
    if (user) {
      errors.username = 'User already exists';
      return res.status(400).json(errors);
    }
    const newUser = await new User({
      username,
      password: Helpers.HashValue(password)
    }).save();
    return res.status(201).json({
      responseCode: '00',
      staus: 'success',
      message: `${username} created.`
    });
  } catch (error) {
    return next(error);
  }
};

Auth.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { errors, isValid } = AuthValidation({ username, password });

    if (!isValid) {
      return res.status(400).json(errors);
    }
    //Find the user by username
    let user = await User.findOne({ username });
    if (!user) {
      errors.username = 'No account matched with username provided';
      return res.status(400).json(errors);
    }
    let isPassword = Helpers.UnHashValue(password, user.password);
    if (isPassword) {
      user.password = undefined;
      let token = generateToken(user.toJSON());
      return res.status(200).json({ token: `Bearer ${token}` });
    }
    errors.password = 'Password is incorrect';
    return res.status(401).json(errors);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

Auth.CurrentUser = async (req, res, next) => {
  try {
    const { decoded } = res;
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id })
      .where({ isDeleted: false })
      .sord({ createdAt: -1 });
    console.log(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = Auth;
