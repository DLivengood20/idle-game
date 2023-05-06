import React from 'react';
import './AutoClickerButton.css';

const AutoClickerButton = ({
  tier,
  cookies,
  autoClickers,
  tier2AutoClickers,
  setAutoClickers,
  setTier2AutoClickers,
  tier3AutoClickers,
  setTier3AutoClickers,
  setCount,
}) => {
  const getAutoclickerCost = (tier) => {
    switch (tier) {
      case 1:
        return autoClickers === 0
          ? 10
          : Math.round(10 * Math.pow(1.2, autoClickers));
      case 2:
        return tier2AutoClickers === 0
          ? 100
          : Math.round(100 * Math.pow(1.2, tier2AutoClickers));
      case 3:
        return tier3AutoClickers === 0
          ? 1000
          : Math.round(1000 * Math.pow(1.2, tier3AutoClickers));
      default:
        return 0;
    }
  };

  const handleClick = () => {
    const cost = getAutoclickerCost(tier);
    if (cookies >= cost) {
      switch (tier) {
        case 1:
          setAutoClickers(autoClickers + 1);
          setCount(cookies - cost);
          break;
        case 2:
          setTier2AutoClickers(tier2AutoClickers + 1);
          setCount(cookies - cost);
          break;
        case 3:
          setTier3AutoClickers(tier3AutoClickers + 1);
          setCount(cookies - cost);
          break;
        default:
          break;
      }
    } else {
      alert("You don't have enough cookies!" + cost);
    }
  };

  return (
    <button onClick={handleClick}>
      Buy Tier {tier} Auto-clicker ({getAutoclickerCost(tier)} cookies)
    </button>
  );
};

export default AutoClickerButton;
