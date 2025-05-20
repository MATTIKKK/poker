const { Game, Participant } = require('../../models');

exports.joinGame = async (req, res) => {
  try {
    const userId = req.user?.id;
    const gameId = parseInt(req.params.gameId, 10);
    console.log('JoinGame user ID:', req.user?.id, 'game ID:', req.params.gameId);


    if (!userId || isNaN(gameId)) {
      return res.status(400).json({ msg: 'Invalid user or game ID' });
    }

    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ msg: 'Game not found' });
    }

    const [participant, created] = await Participant.findOrCreate({
      where: { userId, gameId },
    });

    return res.status(201).json({ participant, created });
  } catch (err) {
    console.error('[JOIN GAME ERROR]', err);
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
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

  // Удалить участника
  const deleted = await Participant.destroy({
    where: { userId, gameId }
  });

  if (!deleted) {
    return res.status(404).json({ msg: 'Вы не участвуете в этой игре' });
  }

  // Проверить, остались ли ещё участники
  const remaining = await Participant.count({ where: { gameId } });

  if (remaining === 0) {
    // Если никого не осталось — удалить игру
    await Game.destroy({ where: { id: gameId } });
    console.log(`🗑 Игра ${gameId} удалена, так как участников больше нет`);
  }

  res.json({ msg: 'Вы вышли из игры' });
};