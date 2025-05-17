import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const tables = [
  {
    id: 'a1b2c3',
    name: 'Beginner’s Luck',
    players: 2,
    maxPlayers: 6,
    smallBlind: 5,
    bigBlind: 10,
    status: 'waiting',
  },
  {
    id: 'd4e5f6',
    name: 'High-Rollers',
    players: 3,
    maxPlayers: 9,
    smallBlind: 50,
    bigBlind: 100,
    status: 'waiting',
  },
  {
    id: 'g7h8i9',
    name: 'Night Owls',
    players: 5,
    maxPlayers: 6,
    smallBlind: 10,
    bigBlind: 20,
    status: 'in-progress', // ← НЕ попадёт в список
  },
];

const LobbyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="lobby">
      <h1>Waiting tables</h1>

      <ul className="table-list">
        {tables.map((t) => (
          <li key={t.id} className="table-card">
            <div className="table-main">
              <span className="table-name">{t.name}</span>
              <span className="table-blinds">
                {t.smallBlind}/{t.bigBlind}
              </span>
            </div>

            <div className="table-sub">
              <span>
                {t.players}/{t.maxPlayers} players
              </span>
              <button
                className="join-btn"
                onClick={() => navigate(`/table/${t.id}`)}
              >
                Join
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
