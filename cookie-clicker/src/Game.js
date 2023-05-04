import React, { useState, useEffect } from 'react';
import Cookie from './components/Cookie';
import ClickerShop from './components/ClickerShop';

const Game = () => {
  const [cookies, setCount] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);
  const [tier2AutoClickers, setTier2AutoClickers] = useState(0);

  const handleClick = () => {
    setCount(cookies + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + (autoClickers + (tier2AutoClickers * 2)));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers, tier2AutoClickers]);

  return (
    <div>
      <Cookie cookies={cookies} onClick={handleClick} />
      <ClickerShop
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        tier2AutoClickers={tier2AutoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        setCount={setCount}
      />
    </div>
  );
};

export default Game;
