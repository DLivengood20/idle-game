import React from 'react';

const AutoClickerButton = ({ cost, cookies, onClick }) => {
  const handleClick = () => {
    if (cookies >= cost) {
      onClick();
    } else {
      alert("You don't have enough cookies!" + cost);
    }
  };

  return (
    <button onClick={handleClick}>
      Buy Auto-clicker ({cost} cookies)
    </button>
  );
};

export default AutoClickerButton;
