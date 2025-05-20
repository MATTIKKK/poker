// src/pages/RulesPage.tsx
import React from 'react';
import './pages.css';
import { useNavigate } from 'react-router-dom';
import { cardImg } from '../utils/poker';
import { Card, Rank, Suit } from '../types/poker';

const examples: Record<string, Card[]> = {
  'Royal Flush': [
    { rank: 'A' as Rank, suit: 's' as Suit },
    { rank: 'K' as Rank, suit: 's' as Suit },
    { rank: 'Q' as Rank, suit: 's' as Suit },
    { rank: 'J' as Rank, suit: 's' as Suit },
    { rank: 'T' as Rank, suit: 's' as Suit },
  ],
  'Straight Flush': [
    { rank: '9' as Rank, suit: 'h' as Suit },
    { rank: '8' as Rank, suit: 'h' as Suit },
    { rank: '7' as Rank, suit: 'h' as Suit },
    { rank: '6' as Rank, suit: 'h' as Suit },
    { rank: '5' as Rank, suit: 'h' as Suit },
  ],
  'Four of a Kind': [
    { rank: 'J' as Rank, suit: 'c' as Suit },
    { rank: 'J' as Rank, suit: 'd' as Suit },
    { rank: 'J' as Rank, suit: 'h' as Suit },
    { rank: 'J' as Rank, suit: 's' as Suit },
    { rank: '9' as Rank, suit: 'd' as Suit },
  ],
  'Full House': [
    { rank: 'Q' as Rank, suit: 'c' as Suit },
    { rank: 'Q' as Rank, suit: 'd' as Suit },
    { rank: 'Q' as Rank, suit: 'h' as Suit },
    { rank: '8' as Rank, suit: 'c' as Suit },
    { rank: '8' as Rank, suit: 's' as Suit },
  ],
  'Flush': [
    { rank: 'A' as Rank, suit: 'd' as Suit },
    { rank: 'J' as Rank, suit: 'd' as Suit },
    { rank: '8' as Rank, suit: 'd' as Suit },
    { rank: '4' as Rank, suit: 'd' as Suit },
    { rank: '2' as Rank, suit: 'd' as Suit },
  ],
};

const RulesPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rules-page">
      <header className="rules-header">
        <h1>Poker Rules</h1>
        <button className="back-btn" onClick={() => navigate(-1)}>
          Back
        </button>
      </header>

      <main className="rules-content">
        <section>
          <h2>Game Overview</h2>
          <p>
            Texas Hold&apos;em is the most popular variant of poker. Each player
            is dealt two private cards (hole cards), and five community cards
            are dealt face up in three stages: the Flop (3 cards), the Turn (1
            card), and the River (1 card). Players make the best possible five-card
            poker hand using any combination of their two hole cards and the five
            community cards.
          </p>
          <ol>
            <li>
              <strong>Pre-flop:</strong> Betting round after each player receives
              two hole cards.
            </li>
            <li>
              <strong>Flop:</strong> Three community cards are revealed, followed
              by a betting round.
            </li>
            <li>
              <strong>Turn:</strong> Fourth community card is revealed, followed
              by a betting round.
            </li>
            <li>
              <strong>River:</strong> Fifth community card is revealed, followed
              by the final betting round.
            </li>
            <li>
              <strong>Showdown:</strong> Remaining players reveal their hands;
              best five-card hand wins the pot.
            </li>
          </ol>
        </section>

        <section className="hand-ranks">
          <h2>Hand Rankings &amp; Examples</h2>
          <ul>
            {Object.entries(examples).map(([name, cards]) => (
              <li key={name} className="hand-example">
                <strong>{name}</strong>
                <div className="cards-demo">
                  {cards.map((c, i) => (
                    <img
                      key={i}
                      src={cardImg(c)}
                      alt={`${c.rank} of ${c.suit}`}
                      className="card-sample"
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default RulesPage;
