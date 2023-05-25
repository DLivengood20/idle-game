import React, { useState, useEffect } from 'react';
import Cookie from './Cookie';
import AutoClickerDisplay from './AutoClickerDisplay';
import GetCookieSize from '../utils/GetCookieSize';
import ResetButton from './ResetButton';
import ShopSidebar from './ShopSidebar';
import ComboMeter from './ComboMeter';
import './styles/Game.css';

const Game = () => {
  // State variables
  const [cookies, setCount] = useState(0);
  const [tier1AutoClickers, setTier1AutoClickers] = useState(0);
  const [tier2AutoClickers, setTier2AutoClickers] = useState(0);
  const [tier3AutoClickers, setTier3AutoClickers] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);

  useEffect(() => {
    // Load cookies and auto clickers from browser storage
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
    // ... Load other auto clickers similarly
  }, []);

  useEffect(() => {
    // Update cookies and auto clickers in browser storage
    setCookieValue('cookies', cookies.toString());
    setCookieValue('tier1AutoClickers', tier1AutoClickers.toString());
    setCookieValue('tier2AutoClickers', tier2AutoClickers.toString());
    setCookieValue('tier3AutoClickers', tier3AutoClickers.toString());
    // ... Update other auto clickers similarly
  }, [cookies, tier1AutoClickers, tier2AutoClickers, tier3AutoClickers]);

  // Function to handle cookie click
  const handleClick = () => {
    setCount(cookies + comboMultiplier);
    setComboCount(comboCount + 10);
  };

  // Function to calculate auto clicker values
  const calculateAutoClickerValues = (
    autoClickers,
    tier2AutoClickers,
    tier3AutoClickers
  ) => {
    // Calculation logic for intervalLength and cookiesPerInterval
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
    // Effect for auto clicker functionality
    if (tier1AutoClickers + tier2AutoClickers + tier3AutoClickers > 0) {
      const { intervalLength, cookiesPerInterval } = calculateAutoClickerValues(
        tier1AutoClickers,
        tier2AutoClickers,
        tier3AutoClickers
      );
      const interval = setInterval(() => {
        setCount(
          (prevCount) => prevCount + cookiesPerInterval * comboMultiplier
        );
      }, intervalLength);
      return () => clearInterval(interval);
    }
  }, [
    tier1AutoClickers,
    tier2AutoClickers,
    tier3AutoClickers,
    comboMultiplier,
  ]);

  return (
    <div className="App">
      <h1>Cookie Clicker</h1>

      <div
        data-testid="game-component"
        style={{ '--cookie-size': `${GetCookieSize()}px` }}
      >
        <Cookie cookies={cookies} onClick={handleClick} />
        <AutoClickerDisplay
          tier1AutoClickers={tier1AutoClickers}
          tier2AutoClickers={tier2AutoClickers}
          tier3AutoClickers={tier3AutoClickers}
        />
        <ShopSidebar
          cookies={cookies}
          tier1AutoClickers={tier1AutoClickers}
          setTier1AutoClickers={setTier1AutoClickers}
          tier2AutoClickers={tier2AutoClickers}
          setTier2AutoClickers={setTier2AutoClickers}
          tier3AutoClickers={tier3AutoClickers}
          setTier3AutoClickers={setTier3AutoClickers}
          setCount={setCount}
        />
        <ComboMeter
          comboCount={comboCount}
          setComboCount={setComboCount}
          comboMultiplier={comboMultiplier}
          setComboMultiplier={setComboMultiplier}
        />
        <ResetButton
          setCount={setCount}
          setTier1AutoClickers={setTier1AutoClickers}
          setTier2AutoClickers={setTier2AutoClickers}
          setTier3AutoClickers={setTier3AutoClickers}
        />
      </div>
    </div>
  );
};

// Function to get the value of a cookie
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

// Function to set the value of a cookie
function setCookieValue(key, value) {
  document.cookie = `${key}=${value}`;
}

export default Game;
