const jwt = require('jsonwebtoken');
const { Unauthorized } = require('../errors/unauthorized.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized('Необходимо авторизироваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'sekret');
  } catch (e) {
    const err = new Unauthorized('Необходимо авторизироваться');
    next(err);
  }

  req.user = payload;
  next();
};
