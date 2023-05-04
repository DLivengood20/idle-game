import React, { useState, useEffect } from 'react';
import Cookie from './Cookie';
import AutoClickerButton from './AutoClickerButton';

const Game = () => {
  const [cookies, setCount] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);
  const [tier2AutoClickers, setTier2AutoClickers] = useState(0);

  const getAutoclickerCost = (tier) => {
    if (tier === 1) {
      return autoClickers === 0 ? 10 : Math.round(10 * Math.pow(1.2, autoClickers));
    } else if (tier === 2) {
      return tier2AutoClickers === 0 ? 100 : Math.round(100 * Math.pow(1.2, tier2AutoClickers));
    }
  };

  const buyAutoClicker = (tier) => {
    if (tier === 1 && cookies >= getAutoclickerCost(1)) {
      setCount(cookies - getAutoclickerCost(1));
      setAutoClickers(autoClickers + 1);
    } else if (tier === 2 && cookies >= getAutoclickerCost(2)) {
      setCount(cookies - getAutoclickerCost(2));
      setTier2AutoClickers(tier2AutoClickers + 1);
    } else {
      alert("You don't have enough cookies!");
    }
  };

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
      <AutoClickerButton cost={getAutoclickerCost(1)} cookies={cookies} onClick={() => buyAutoClicker(1)} />
      <AutoClickerButton cost={getAutoclickerCost(2)} cookies={cookies} onClick={() => buyAutoClicker(2)} />
    </div>
  );
};

export default Game;
