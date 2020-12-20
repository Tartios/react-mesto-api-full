const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsRouter = require('./cards.js');
const usersRouter = require('./users.js');
const auth = require('../middlewares/auth.js');
const { login, createUser } = require('../controllers/login.js');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);

router.use('/cards', auth, cardsRouter);

router.use('/users', auth, usersRouter);

module.exports = router;
