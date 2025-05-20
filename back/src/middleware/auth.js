// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../../models');  // путь до папки models из src/middleware

module.exports = async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: 'Токен не предоставлен' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Неверный формат токена' });
  }

  const token = parts[1];
  try {
    // Проверяем подпись и срок действия
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload = { id, username, iat, exp }

    // Подтягиваем пользователя из БД (чтобы убедиться, что он ещё есть)
    const user = await User.findByPk(payload.id, {
      attributes: ['id', 'email', 'username']
    });
    if (!user) {
      return res.status(401).json({ msg: 'Пользователь не найден' });
    }

    // Кладём данные пользователя в объект запроса
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Неверный или просроченный токен' });
  }
};
