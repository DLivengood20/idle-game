import React from 'react';
import AutoClickerButton from './AutoClickerButton';

const ClickerShop = ({
  cookies,
  autoClickers,
  setAutoClickers,
  tier2AutoClickers,
  setTier2AutoClickers,
  setCount
}) => {
  const getAutoclickerCost = (tier) => {
    if (tier === 1) {
      return autoClickers === 0 ? 10 : Math.round(10 * Math.pow(1.2, autoClickers));
    } else if (tier === 2) {
      return tier2AutoClickers === 0 ? 100 : Math.round(100 * Math.pow(1.2, tier2AutoClickers));
    }
  };

  const buyAutoClicker = (tier, setCount) => {
    if (tier === 1 && cookies >= getAutoclickerCost(1)) {
      setAutoClickers(autoClickers + 1);
      setCount(cookies - getAutoclickerCost(1));
    } else if (tier === 2 && cookies >= getAutoclickerCost(2)) {
      setTier2AutoClickers(tier2AutoClickers + 1);
      setCount(cookies - getAutoclickerCost(2));
    } else {
      alert("You don't have enough cookies!");
    }
  };

  return (
    <div>
      <AutoClickerButton cost={getAutoclickerCost(1)} cookies={cookies} onClick={() => buyAutoClicker(1, setCount)} />
      <AutoClickerButton cost={getAutoclickerCost(2)} cookies={cookies} onClick={() => buyAutoClicker(2, setCount)} />
    </div>
  );
};

export default ClickerShop;
