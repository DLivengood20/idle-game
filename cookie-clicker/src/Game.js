import React, { useState, useEffect } from 'react';
import Cookie from './components/Cookie';
import ClickerShop from './components/ClickerShop';

const Game = () => {
  const [cookies, setCount] = useState(10000);
  const [autoClickers, setAutoClickers] = useState(0);
  const [tier2AutoClickers, setTier2AutoClickers] = useState(0);
  const [tier3AutoClickers, setTier3AutoClickers] = useState(0);

  const handleClick = () => {
    setCount(cookies + 1);
  };

  useEffect(() => {
    if (autoClickers + tier2AutoClickers + tier3AutoClickers > 0) {
      const totalClicks =
        autoClickers + tier2AutoClickers * 2 + tier3AutoClickers * 5;
      let intervalLength, cookiesPerInterval;
      switch (true) {
        case totalClicks < 1000:
          intervalLength = 1000 / totalClicks;
          cookiesPerInterval = 1;
          break;
        case totalClicks < 10000:
          intervalLength = 1000 / Math.floor(totalClicks / 10);
          cookiesPerInterval = totalClicks / 10;
          break;
        default:
          intervalLength = 1000 / Math.floor(totalClicks / 100);
          cookiesPerInterval = totalClicks / 100;
          break;
      }
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + cookiesPerInterval);
      }, intervalLength);
      return () => clearInterval(interval);
    }
  }, [autoClickers, tier2AutoClickers, tier3AutoClickers]);

  return (
    <div>
      <Cookie cookies={cookies} onClick={handleClick} />
      <ClickerShop
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        tier2AutoClickers={tier2AutoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        tier3AutoClickers={tier3AutoClickers}
        setTier3AutoClickers={setTier3AutoClickers}
        setCount={setCount}
      />
    </div>
  );
};

export default Game;
