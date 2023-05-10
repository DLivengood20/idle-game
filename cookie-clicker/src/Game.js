import React, { useState, useEffect } from 'react';
import Cookie from './components/Cookie';
import ClickerShop from './components/ClickerShop';

const Game = () => {
  const [cookies, setCount] = useState(0);
  const [tier1AutoClickers, setTier1AutoClickers] = useState(0);
  const [tier2AutoClickers, setTier2AutoClickers] = useState(0);
  const [tier3AutoClickers, setTier3AutoClickers] = useState(0);

  useEffect(() => {
    // Load cookies from browser storage
    const savedCookies = Number(getCookieValue('cookies'));
    if (savedCookies !== 0) {
      setCount(parseInt(savedCookies));
    }
    const savedTier1AutoClickers = Number(getCookieValue('tier1AutoClickers'));
    if (savedTier1AutoClickers !== 0) {
      setTier1AutoClickers(parseInt(savedTier1AutoClickers));
    }
    const savedTier2AutoClickers = Number(getCookieValue('tier2AutoClickers'));
    if (savedTier2AutoClickers !== 0) {
      setTier2AutoClickers(parseInt(savedTier2AutoClickers));
    }
    const savedTier3AutoClickers = Number(getCookieValue('tier3AutoClickers'));
    if (savedTier3AutoClickers !== 0) {
      setTier3AutoClickers(parseInt(savedTier3AutoClickers));
    }
  }, []);

  useEffect(() => {
    // Update cookies and autoClickers in browser storage
    setCookieValue('cookies', cookies.toString());
    setCookieValue('tier1AutoClickers', tier1AutoClickers.toString());
    setCookieValue('tier2AutoClickers', tier2AutoClickers.toString());
    setCookieValue('tier3AutoClickers', tier3AutoClickers.toString());
  }, [cookies, tier1AutoClickers, tier2AutoClickers, tier3AutoClickers]);

  const handleClick = () => {
    setCount(cookies + 1);
  };

  const calculateAutoClickerValues = (
    autoClickers,
    tier2AutoClickers,
    tier3AutoClickers
  ) => {
    const totalClickers =
      autoClickers + tier2AutoClickers * 2 + tier3AutoClickers * 5;
    let intervalLength, cookiesPerInterval;
    switch (true) {
      case totalClickers < 1000:
        intervalLength = 1000 / totalClickers;
        cookiesPerInterval = 1;
        break;
      case totalClickers < 10000:
        intervalLength = 1000 / Math.floor(totalClickers / 10);
        cookiesPerInterval = totalClickers / 10;
        break;
      default:
        intervalLength = 1000 / Math.floor(totalClickers / 100);
        cookiesPerInterval = totalClickers / 100;
        break;
    }
    return { intervalLength, cookiesPerInterval };
  };

  useEffect(() => {
    if (tier1AutoClickers + tier2AutoClickers + tier3AutoClickers > 0) {
      const { intervalLength, cookiesPerInterval } = calculateAutoClickerValues(
        tier1AutoClickers,
        tier2AutoClickers,
        tier3AutoClickers
      );
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + cookiesPerInterval);
      }, intervalLength);
      return () => clearInterval(interval);
    }
  }, [tier1AutoClickers, tier2AutoClickers, tier3AutoClickers]);

  return (
    <div data-testid="game-component">
      <Cookie cookies={cookies} onClick={handleClick} />
      <ClickerShop
        cookies={cookies}
        autoClickers={tier1AutoClickers}
        setAutoClickers={setTier1AutoClickers}
        tier2AutoClickers={tier2AutoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        tier3AutoClickers={tier3AutoClickers}
        setTier3AutoClickers={setTier3AutoClickers}
        setCount={setCount}
      />
    </div>
  );
};

function getCookieValue(key) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${key}=`)) {
      return cookie.substring(`${key}=`.length, cookie.length);
    }
  }
  return '';
}

function setCookieValue(key, value) {
  document.cookie = `${key}=${value}`;
}

export default Game;
