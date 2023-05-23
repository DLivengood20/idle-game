import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ClickerShop from './ClickerShop';

describe('ClickerShop component', () => {
  it('should render three AutoClickerButtons', () => {
    const { getAllByTestId } = render(
      <ClickerShop
        cookies={0}
        autoClickers={0}
        setAutoClickers={() => {}}
        tier2AutoClickers={0}
        setTier2AutoClickers={() => {}}
        tier3AutoClickers={0}
        setTier3AutoClickers={() => {}}
        setCount={() => {}}
      />
    );

    expect(getAllByTestId('autoclicker-button')).toHaveLength(3);
  });

  describe('should update the cookie count when', () => {
    it('should update the cookie count when a Tier 1 AutoClickerButton is clicked', () => {
      const setCount = jest.fn();
      const { getAllByTestId } = render(
        <ClickerShop
          cookies={9999}
          autoClickers={0}
          setAutoClickers={() => {}}
          tier2AutoClickers={0}
          setTier2AutoClickers={() => {}}
          tier3AutoClickers={0}
          setTier3AutoClickers={() => {}}
          setCount={setCount}
        />
      );

      const tier1Button = getAllByTestId('autoclicker-button')[0];
      fireEvent.click(tier1Button);

      expect(setCount).toHaveBeenCalledWith(9989);
    });

    it('should update the cookie count when a Tier 2 AutoClickerButton is clicked', () => {
      const setCount = jest.fn();
      const { getAllByTestId } = render(
        <ClickerShop
          cookies={9999}
          autoClickers={0}
          setAutoClickers={() => {}}
          tier2AutoClickers={0}
          setTier2AutoClickers={() => {}}
          tier3AutoClickers={0}
          setTier3AutoClickers={() => {}}
          setCount={setCount}
        />
      );

      const tier2Button = getAllByTestId('autoclicker-button')[1];
      fireEvent.click(tier2Button);

      expect(setCount).toHaveBeenCalledWith(9899);
    });

    it('should update the cookie count when a Tier 3 AutoClickerButton is clicked', () => {
      const setCount = jest.fn();
      const { getAllByTestId } = render(
        <ClickerShop
          cookies={9999}
          autoClickers={0}
          setAutoClickers={() => {}}
          tier2AutoClickers={0}
          setTier2AutoClickers={() => {}}
          tier3AutoClickers={0}
          setTier3AutoClickers={() => {}}
          setCount={setCount}
        />
      );

      const tier3Button = getAllByTestId('autoclicker-button')[2];
      fireEvent.click(tier3Button);

      expect(setCount).toHaveBeenCalledWith(8999);
    });
  });
});
