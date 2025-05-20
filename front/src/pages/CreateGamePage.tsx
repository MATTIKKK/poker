import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

const CreateGamePage = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName]           = useState<string>('');
  const [maxPlayers, setMaxPlayers]       = useState<number>(6);
  const [maxBet, setMaxBet]               = useState<number>(1000);
  const [startingChips, setStartingChips] = useState<number>(5000);
  const [loading, setLoading]             = useState<boolean>(false);
  const [error, setError]                 = useState<string | null>(null);

  const handleCreateGame = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Нет авторизации');

      const res = await fetch('http://localhost:8000/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: roomName,
          maxPlayers,
          maxBet,
          startingChips,
          gameType: 'Holdem'
        })
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Сервер вернул ${res.status}: ${text}`);
      }

      const newGame = await res.json(); 
      console.log("new game", newGame)
      navigate(`/game/${newGame.id}`);
    } catch (err: any) {
      console.error('[CREATE GAME ERROR]', err);
      setError(err.message || 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-game page">
      <h1>🎯 Create Poker Room</h1>
      <form className="create-game-form" onSubmit={handleCreateGame}>
        <label>
          Room Name:
          <input
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            placeholder="Enter room name"
            required
            disabled={loading}
          />
        </label>
        <label>
          Max Players:
          <select
            value={maxPlayers}
            onChange={e => setMaxPlayers(Number(e.target.value))}
            disabled={loading}
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map(n => (
              <option key={n} value={n}>
                {n} players
              </option>
            ))}
          </select>
        </label>
        <label>
          Max Bet Limit:
          <input
            type="number"
            value={maxBet}
            onChange={e => setMaxBet(Number(e.target.value))}
            min={1}
            required
            disabled={loading}
          />
        </label>
        <label>
          Starting Chips per Player:
          <input
            type="number"
            value={startingChips}
            onChange={e => setStartingChips(Number(e.target.value))}
            min={100}
            required
            disabled={loading}
          />
        </label>

        {error && <div className="form-error">Error: {error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Creating…' : 'Create Room'}
        </button>
      </form>
    </div>
  );
};

export default CreateGamePage;
