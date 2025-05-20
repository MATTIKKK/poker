import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LobbyPage from './pages/LobbyPage';
import PokerGamePage from './pages/PokerGamePage';
import CreateGamePage from './pages/CreateGamePage';
import RulesPage from './pages/RulesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/rules' element={<RulesPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/lobby' element={<LobbyPage />}/>
        <Route path='/game/:id' element={<PokerGamePage />}/>
        <Route path='/create-game' element={<CreateGamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
