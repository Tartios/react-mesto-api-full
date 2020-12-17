const cardModel = require('../models/card.js');
const { NotFoundError } = require('../errors/not-found-error.js');
const { ValidationError } = require('../errors/validationerror.js');

module.exports.getCards = (req, res, next) => {
  cardModel.find()
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      res.send(data);
    })
    .catch((next));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  cardModel.create({ owner, ...req.body })
    .then((card) => {
      if (!card) {
        throw new ValidationError('Данные переданные пользователем некорректны.');
      }

      res.send(card);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { _id } = req.params;
  cardModel.findByIdAndRemove({ _id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с таким id не обнаружена');
      }

      res.send({ data: card });
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => cardModel.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с таким id не обнаружена');
    }

    res.send(card);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => cardModel.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Карточка с таким id не обнаружена');
    }

    res.send(card);
  })
  .catch(next);
