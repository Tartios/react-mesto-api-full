const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const validator = require('validator');
const { Unauthorized } = require('../errors/unauthorized.js');
const { ValidationError } = require('../errors/validationerror.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => /(http|https):\/\/(www)?[a-z0-9-._~:/?#[\]@!$&'()*+,;=]{1,}#?/.test(v),
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  if (!email || !password) {
    throw new ValidationError('Введенные данные некорректны');
  }
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized('Неверные почта или пароль');
          }
          return user;
        });
    });
};

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
