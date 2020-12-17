const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('../errors/validationerror.js');
const { DataError } = require('../errors/dataError.js');
const userModel = require('../models/user.js');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  userModel.findOne({ email })
    .then((user) => {
      if (user) {
        throw new DataError('Такой пользователь уже существует.');
      }
    });
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new ValidationError('Данные переданные пользователем некорректны');
      }

      res.send({ data: user });
    })
    .catch(next);
};
