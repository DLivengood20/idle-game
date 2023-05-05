import React from 'react';
import './AutoClickerButton.css';

const AutoClickerButton = ({ tier, cost, cookies, onClick }) => {
  const handleClick = () => {
    if (cookies >= cost) {
      onClick();
    } else {
      alert("You don't have enough cookies!" + cost);
    }
  };

  return (
    <button onClick={handleClick}>
      Buy Tier {tier} Auto-clicker ({cost} cookies)
    </button>
  );
};

export default AutoClickerButton;
