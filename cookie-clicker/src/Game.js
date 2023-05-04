import React, { useState, useEffect } from 'react';
import Cookie from './Cookie';
import AutoClickerButton from './AutoClickerButton';

const Game = () => {
  const [cookies, setCount] = useState(0);
  const [autoClickers, setAutoClickers] = useState(0);

  const getAutoclickerCost = () => {
    return Math.round(10 * Math.pow(1.2, autoClickers + 1));
  };

  const buyAutoClicker = () => {
    if (cookies >= getAutoclickerCost()) {
      setCount(cookies - getAutoclickerCost());
      setAutoClickers(autoClickers + 1);
    } else {
      alert("You don't have enough cookies!");
    }
  };

  const handleClick = () => {
    setCount(cookies + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + autoClickers);
    }, 1000);
    return () => clearInterval(interval);
  }, [autoClickers]);

  return (
    <div>
      <Cookie cookies={cookies} />
      <div>Current cookies: {cookies}</div>
      <button onClick={handleClick}>Click me!</button>
      <AutoClickerButton cost={getAutoclickerCost()} cookies={cookies} onClick={buyAutoClicker} />
    </div>
  );
};

export default Game;
