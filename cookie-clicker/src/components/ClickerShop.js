import React from 'react';
import AutoClickerButton from './AutoClickerButton';

const ClickerShop = ({
  cookies,
  autoClickers,
  setAutoClickers,
  tier2AutoClickers,
  setTier2AutoClickers,
  tier3AutoClickers,
  setTier3AutoClickers,
  setCount,
}) => {
  return (
    <div data-testid="shop-component">
      {/* Render AutoClickerButton for Tier 1 */}
      <AutoClickerButton
        tier={1}
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        setCount={setCount}
      />

      {/* Render AutoClickerButton for Tier 2 */}
      <AutoClickerButton
        tier={2}
        cookies={cookies}
        tier2AutoClickers={tier2AutoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        setCount={setCount}
      />

      {/* Render AutoClickerButton for Tier 3 */}
      <AutoClickerButton
        tier={3}
        cookies={cookies}
        tier3AutoClickers={tier3AutoClickers}
        setTier3AutoClickers={setTier3AutoClickers}
        setCount={setCount}
      />
    </div>
  );
};

export default ClickerShop;
