const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  dislikeCard,
  likeCard,
} = require('../controllers/cards.js');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().uri(),
  }),
}), createCard);

router.delete('/:_id', deleteCard);
// celebrate({
//   body: Joi.object().keys({
//     _id: Joi.string(),
//   }),
// }),

router.put('/likes/:_id', likeCard);
// celebrate({
//   body: Joi.object().keys({
//     _id: Joi.string(),
//   }),
// }),

router.delete('/likes/:_id', dislikeCard);
// celebrate({
//   body: Joi.object().keys({
//     _id: Joi.string(),
//   }),
// }),

module.exports = router;
