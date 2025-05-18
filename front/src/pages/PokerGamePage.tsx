import { useEffect, useState } from 'react';
import { Card, DealState } from '../types/poker';
import { cardImg, deal, openCount } from '../utils/poker';
import './pages.css';

export const mockParticipants = [
  {
    id: 'p1',
    gameId: 'a1b2c3',
    name: 'Alice',
    stack: 1_200,
    rating: 1420,
    level: 'Pro',
    seat: 0,
    isDealer: true,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
  },
  {
    id: 'p2',
    gameId: 'a1b2c3',
    name: 'Bob',
    stack: 950,
    rating: 1150,
    level: 'Regular',
    seat: 1,
    isDealer: false,
    isSmallBlind: true,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
  },
  {
    id: 'p3',
    gameId: 'a1b2c3',
    name: 'Charlie',
    stack: 780,
    rating: 1240,
    level: 'Regular',
    seat: 2,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: true,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
  },
  {
    id: 'p4',
    gameId: 'a1b2c3',
    name: 'Dana',
    stack: 1_050,
    rating: 1500,
    level: 'Pro',
    seat: 3,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dana',
  },
  {
    id: 'p5',
    gameId: 'a1b2c3',
    name: 'Evan',
    stack: 610,
    rating: 990,
    level: 'Beginner',
    seat: 4,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Evan',
  },
  {
    id: 'p6',
    gameId: 'a1b2c3',
    name: 'Fay',
    stack: 880,
    rating: 1100,
    level: 'Regular',
    seat: 5,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fay',
  },
  {
    id: 'p7',
    gameId: 'a1b2c3',
    name: 'Grace',
    stack: 925,
    rating: 1280,
    level: 'Regular',
    seat: 6,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl:
      'https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png',
  },
  {
    id: 'p8',
    gameId: 'a1b2c3',
    name: 'Henry',
    stack: 70,
    rating: 1005,
    level: 'Beginner',
    seat: 7,
    isDealer: false,
    isSmallBlind: false,
    isBigBlind: false,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
  },
];

export default function PokerGamePage() {
  const currentUserId = 'p8';
  const [dealState, setDealState] = useState<DealState | null>(null);

  useEffect(() => {
    const ordered = [...mockParticipants].sort((a: any, b: any) =>
      a.id === currentUserId ? -1 : b.id === currentUserId ? 1 : 0
    );

    setDealState({ ...deal(ordered), street: 'preflop' });
  }, []);

  if (!dealState) return null;

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

        {players.map((p: any, i: any) => (
          <div className={`seat seat-${i}`} key={p.id}>
            <div className="player-header">
              <img
                className="user-avatar"
                src={p.avatarUrl ?? '/img/default-avatar.png'}
                alt={p.name}
              />

              <div className="player-info">
                <span className="player-name">{p.name}</span>
                <span className={`player-stack ${p.stack < 100 ? 'red': ''}`}>
                  ${p.stack.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="hole">
              {p.hole.map((c: Card, idx: number) => (
                <img
                  key={idx}
                  className="card-small"
                  src={p.id === currentUserId ? cardImg(c) : '/cards/back.jpg'}
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
