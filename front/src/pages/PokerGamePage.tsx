import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, DealState } from '../types/poker';
import { cardImg, deal, generateRandomAvatar, openCount } from '../utils/poker';
import { socket } from '../socket';

export default function PokerGamePage() {
  const { id: gameId } = useParams();
  const userId = localStorage.getItem('userId')!;
  const [dealState, setDealState] = useState<DealState | null>(null);

  useEffect(() => {
    // Подключение и вступление в комнату
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit('join', { roomId: gameId, userId });

    const handleRoomUpdate = (room: any) => {
      if (!room || !Array.isArray(room.players)) {
        console.warn('[room_update] invalid data:', room);
        return;
      }

      const ordered = [...room.players].sort((a, b) =>
        a.id === userId ? -1 : b.id === userId ? 1 : 0
      );

      setDealState({ ...deal(ordered), street: 'preflop' });
    };

    socket.on('room_update', handleRoomUpdate);

  }, [gameId, userId]);

  if (!dealState) return <div className="poker-game">Loading game...</div>;

  const { board, players, street } = dealState;
  const nOpen = openCount(street);

  return (
    <div className="poker-game">
      <div className="table-wrapper">
        <div className="poker-table" />

        <div className="board">
          {board.map((c, idx) => (
            <img
              key={idx}
              className="card-board"
              src={idx < nOpen ? cardImg(c) : '/cards/back.jpg'}
              alt=""
            />
          ))}
        </div>

        {players.map((p, i) => (
          <div className={`seat seat-${i}`} key={p.id}>
            <div className="player-header">
              <img
                className="user-avatar"
                src={p.avatarUrl || generateRandomAvatar()}
                alt={p.name}
              />
              <div className="player-info">
                <span className="player-name">{p.name}</span>
                <span className={`player-stack ${p.stack < 100 ? 'red' : ''}`}>
                  ${p.stack}
                </span>
              </div>
            </div>
            <div className="hole">
              {p.hole.map((c: Card, idx: number) => (
                <img
                  key={idx}
                  className="card-small"
                  src={p.id === userId ? cardImg(c) : '/cards/back.jpg'}
                  alt=""
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
