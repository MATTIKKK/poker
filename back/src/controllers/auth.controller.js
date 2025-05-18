const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/user'); 
const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ msg: 'Email, username и пароль обязательны' });
  }

  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ msg: 'Пользователь с этим email уже зарегистрирован' });
    }

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ email, username, password: hash });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.status(201).json({
      user: { id: user.id, email: user.email, username: user.username },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Ошибка сервера при регистрации' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: 'Email и пароль обязательны' });

  try {
    const user = await findByEmail(email);
    if (!user)
      return res.status(401).json({ msg: 'Неверные email или пароль' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ msg: 'Неверные email или пароль' });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      user: { id: user.id, email: user.email, username: user.username },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Ошибка при входе' });
  }
};