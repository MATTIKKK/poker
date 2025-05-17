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
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
  },
  {
    id: 'p8',
    gameId: 'a1b2c3',
    name: 'Henry',
    stack: 700,
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

  const ordered = [...mockParticipants].sort((a: any, b: any) =>
    a.id === currentUserId ? -1 : b.id === currentUserId ? 1 : 0
  );

  return (
    <div className="poker-game">
      <div className="table-wrapper">
        {/* сам стол */}
        <div className="poker-table" />

        {/* места за столом */}
        {ordered.map((p: any, i: any) => (
          <div className={`seat seat-${i}`} key={p.id}>
            <img src={p.avatar ?? '/img/default-avatar.png'} alt={p.name} />
            <span>{p.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
