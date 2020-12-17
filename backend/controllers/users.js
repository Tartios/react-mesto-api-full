const userModel = require('../models/user.js');
const { NotFoundError } = require('../errors/not-found-error.js');
const { ValidationError } = require('../errors/validationerror.js');

module.exports.getUsers = (req, res, next) => {
  userModel.find()
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      res.send(data);
    })
    .catch((next));
};

module.exports.getUser = (req, res, next) => {
  userModel.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      return res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new ValidationError('Данные переданные пользователем некорректны.'));
      } else if (err.statusCode === 404) {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const owner = req.user._id;
  const params = req.body;
  userModel.findByIdAndUpdate(owner, params, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Данные переданные пользователем некорректны.');
      }

      return res.send(user);
    })
    .catch((next));
};

module.exports.updateAvatar = (req, res, next) => {
  const owner = req.user._id;
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(owner, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Данные переданные пользователем некорректны.');
      }

      return res.send(user);
    })
    .catch((next));
};

module.exports.getProfile = (req, res, next) => {
  userModel
    .findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }

      res.send(user);
    })
    .catch(next);
};
