const { Participant, User, Game } = require('../models');

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('🟢 New client connected:', socket.id);

    socket.on('join', async ({ roomId, userId }) => {
      console.log(`🧩 ${userId} joined room ${roomId}`);
      socket.join(roomId);
      await emitRoomUpdate(roomId, io);
    });

    socket.on('leave', async ({ roomId, userId }) => {
      console.log(`🚪 ${userId} left room ${roomId}`);
      socket.leave(roomId);

      // Удаляем участника из игры
      await Participant.destroy({ where: { gameId: roomId, userId } });

      const remaining = await Participant.findAll({
        where: { gameId: roomId },
        order: [['seat', 'ASC']],
      });

      const game = await Game.findByPk(roomId);
      if (!game) return;

      // Если текущий хост вышел, назначаем нового
      if (parseInt(userId) === game.hostId) {
        if (remaining.length > 0) {
          const newHostId = remaining[0].userId;
          await game.update({ hostId: newHostId });
          console.log(`👑 Новый хост: ${newHostId}`);
        } else {
          // Если участников больше нет — удаляем игру
          await Game.destroy({ where: { id: roomId } });
          console.log(`🗑 Игра ${roomId} удалена — нет участников`);
          return;
        }
      }

      await emitRoomUpdate(roomId, io);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected:', socket.id);
      // Здесь можно ничего не делать — leave обрабатывается вручную
    });
  });
}

// 🔁 вспомогательная функция для отправки обновлений комнаты
async function emitRoomUpdate(roomId, io) {
  const participants = await Participant.findAll({
    where: { gameId: roomId },
    include: [{ model: User, as: 'user' }],
  });

  io.to(roomId).emit('room_update', {
    roomId,
    players: participants.map(p => ({
      id: p.user.id,
      name: p.user.username,
      avatarUrl: p.user.avatarUrl,
      seat: p.seat,
      isDealer: p.isDealer,
      isSmallBlind: p.isSmallBlind,
      isBigBlind: p.isBigBlind,
      stack: p.stack,
      hole: [],
    })),
  });
}

module.exports = setupSocket;
