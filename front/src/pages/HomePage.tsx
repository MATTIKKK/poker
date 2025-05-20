import React from 'react';
import './pages.css';
import { ChangeModalAC } from '../state/main-reducer';
import { useDispatch } from 'react-redux';
import ShowModal from '../components/show-modal/ShowModal';
import { ChipsRain } from '../components/chips-rain/ChipsRain';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);

  const handleProtectedClick = (targetRoute: string) => {
    if (isLoggedIn) {
      navigate(targetRoute);
    } else {
      localStorage.setItem('redirectAfterAuth', targetRoute);
      dispatch(ChangeModalAC('start'));
    }
  };

  const handleLogout = () => {
    // 1) Clear auth
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('redirectAfterAuth');
    // 2) Optionally reset any Redux auth state here
    // 3) Go back to the home screen
    navigate('/');
  };

  return (
    <>
      <header className="home-header">
        <h2 onClick={() => navigate('/rules')}>The rules</h2>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>
      <main className="home page">
        <ChipsRain />
        <h1>Ready to win?</h1>

        <div className="buttons">
          <button onClick={() => handleProtectedClick('/create-game')}>
            Create Room
          </button>
          <button onClick={() => handleProtectedClick('/lobby')}>
            Join Room
          </button>
        </div>
      </main>

      <ShowModal />
    </>
  );
};

export default HomePage;
