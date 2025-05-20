const { Game, Participant } = require('../../models');

exports.joinGame = async (req, res) => {
  const userId = req.user.id;
  const gameId = +req.params.id;
  const game = await Game.findByPk(gameId);
  if (!game || game.status !== 'waiting') {
    return res.status(400).json({ msg: 'Нельзя присоединиться' });
  }
  const [p, created] = await Participant.findOrCreate({
    where: { userId, gameId }
  });
  if (!created) return res.status(409).json({ msg: 'Уже в игре' });
  res.status(201).json({ msg: 'Присоединились' });
};


exports.getParticipantsByGame = async (req, res) => {
  const gameId = parseInt(req.params.id, 10);
  if (Number.isNaN(gameId)) {
    return res.status(400).json({ msg: 'Invalid game ID' });
  }

  try {
    const participants = await Participant.findAll({
      where: { gameId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'avatarUrl']
        }
      ],
      order: [['seat', 'ASC']]
    });

    // Format the response if you want to merge Participant fields into the user object:
    const result = participants.map(p => ({
      id: p.user.id,
      username: p.user.username,
      avatarUrl: p.user.avatarUrl,
      seat: p.seat,
      isDealer: p.isDealer,
      isSmallBlind: p.isSmallBlind,
      isBigBlind: p.isBigBlind,
      stack: p.stack
    }));

    res.json(result);
  } catch (err) {
    console.error('Error fetching participants:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.leaveGame = async (req, res) => {
  const userId = req.user.id;
  const gameId = +req.params.id;
  const count = await Participant.destroy({ where: { userId, gameId } });
  if (!count) return res.status(404).json({ msg: 'Не в игре' });
  res.json({ msg: 'Вышли из игры' });
};
