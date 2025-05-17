import React from 'react';
import './pages.css';
import chip from '../static/img/chip.png';
import money from '../static/img/dollar.png';
import { ChangeModalAC } from '../state/main-reducer';
import { useDispatch } from 'react-redux';
import ShowModal from '../components/show-modal/ShowModal';
const ChipsRain = () => {
  const items = Array.from({ length: 30 });
  return (
    <div className="">
      {items.map((_, i) => {
        const isChip = i % 2 === 0;
        const size = 70 + Math.random() * 30;
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = 6 + Math.random() * 4;
        const img = isChip ? money : chip;
        return (
          <span
            key={i}
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: size,
              height: size,
              backgroundImage: `url(${img})`,
            }}
            className="rain-item"
          />
        );
      })}
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <main className="home page">
        <ChipsRain />
        <h1>Ready to win?</h1>

        <div className="buttons">
          <button onClick={() => dispatch(ChangeModalAC('start'))}>
            Create Room
          </button>
          <button>join room</button>
        </div>
      </main>

      <ShowModal />
    </>
  );
};

export default HomePage;
