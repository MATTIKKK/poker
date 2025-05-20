const rooms = new Map();

function createRoom(roomId, hostId, config) {
  rooms.set(roomId, {
    hostId,
    players: [{ id: hostId }],
    config
  });
}

function joinRoom(roomId, playerId) {
  const room = rooms.get(roomId);
  if (!room) return null;

  if (!room.players.find(p => p.id === playerId)) {
    room.players.push({ id: playerId });
  }
  return room;
}

function leaveRoom(roomId, playerId) {
  const room = rooms.get(roomId);
  if (!room) return null;

  room.players = room.players.filter(p => p.id !== playerId);
  return room;
}

function getRoom(roomId) {
  return rooms.get(roomId);
}

module.exports = {
  createRoom,
  joinRoom,
  leaveRoom,
  getRoom
};
