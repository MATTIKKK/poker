import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const LobbyPage = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGames() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:8000/api/games', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setTables(data);
        console.log('data', data);
      } catch (err) {
        console.log(err);
        setError('something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (loading) return <div className="lobby__status">Loading tables…</div>;
  if (error) return <div className="lobby__status error">Error: {error}</div>;

  return (
    <div className="lobby">
      <h1>Waiting tables</h1>
      <ul className="table-list">
        {tables.map((t: any) => (
          <li key={t.id} className="table-card">
            <div className="table-main">
              <span className="table-name">{t.name}</span>
              <span className="table-blinds">
                {t.smallBlind}/{t.bigBlind}
              </span>
            </div>
            <div className="table-sub">
              <span>
                {t.players ? t.players.length : 0}/{t.maxPlayers} players
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
