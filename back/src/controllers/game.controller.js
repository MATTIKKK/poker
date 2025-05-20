const { Game, User } = require('../../models');

exports.listGames = async (req, res) => {
  try {
    const games = await Game.findAll({
      where: { status: 'waiting' },
      include: [
        // 1) who created it
        { model: User, as: 'host', attributes: ['id','username'] },
        // 2) who joined it
        {
          model: User,
          as: 'players',
          attributes: ['id'],           // you only need the count here
          through: { attributes: [] }   // don’t return any Participant columns
        }
      ],
      order: [['createdAt','DESC']]
    });
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// POST /api/games — создать новую игру
exports.createGame = async (req, res) => {
  const { name } = req.body;
  const hostId = req.user.id;

  if (!name) {
    return res.status(400).json({ msg: 'Name is required' });
  }

  try {
    const game = await Game.create({ name, hostId });
    res.status(201).json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// GET /api/games/:id — подробности по игре
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id, {
      include: [
        // the host
        { model: User, as: 'host', attributes: ['id','username'] },
        // all players, plus their Participant metadata
        {
          model: User,
          as: 'players',
          attributes: ['id','username','avatarUrl'],
          through: {
            attributes: [
              'seat','isDealer','isSmallBlind','isBigBlind','stack'
            ]
          }
        }
      ]
    });

    if (!game) return res.status(404).json({ msg: 'Game not found' });
    res.json(game);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};