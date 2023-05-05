import React from 'react';
import AutoClickerButton from './AutoClickerButton';

const ClickerShop = ({
  cookies,
  autoClickers,
  setAutoClickers,
  tier2AutoClickers,
  setTier2AutoClickers,
  setCount,
}) => {
  return (
    <div>
      <AutoClickerButton
        tier={1}
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        setCount={setCount}
      />
      <AutoClickerButton
        tier={2}
        cookies={cookies}
        tier2AutoClickers={tier2AutoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        setCount={setCount}
      />
    </div>
  );
};

export default ClickerShop;
