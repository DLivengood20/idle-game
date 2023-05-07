import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutoClickerButton from './AutoClickerButton';

describe('AutoClickerButton', () => {
  it('should update the cookie count when clicked', () => {
    const setCount = jest.fn();
    const setAutoClickers = jest.fn();
    const cookies = 50;
    const autoClickers = 0;
    const { getByTestId } = render(
      <AutoClickerButton
        tier={1}
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        setCount={setCount}
      />
    );
    const button = getByTestId('autoclicker-button');
    fireEvent.click(button);
    expect(setCount).toHaveBeenCalledWith(40);
  });

  it('should update the tier 1 autoClickers count when clicked', () => {
    const setCount = jest.fn();
    const setAutoClickers = jest.fn();
    const cookies = 50;
    const autoClickers = 1;
    const { getByTestId } = render(
      <AutoClickerButton
        tier={1}
        cookies={cookies}
        autoClickers={autoClickers}
        setAutoClickers={setAutoClickers}
        setCount={setCount}
      />
    );
    const button = getByTestId('autoclicker-button');
    fireEvent.click(button);
    expect(setAutoClickers).toHaveBeenCalledWith(2);
  });

  it('should update the tier 2 autoClicker count when clicked', () => {
    const setCount = jest.fn();
    const setTier2AutoClickers = jest.fn();
    const cookies = 500;
    const tier2autoClickers = 1;
    const { getByTestId } = render(
      <AutoClickerButton
        tier={2}
        cookies={cookies}
        tier2AutoClickers={tier2autoClickers}
        setTier2AutoClickers={setTier2AutoClickers}
        setCount={setCount}
      />
    );
    const button = getByTestId('autoclicker-button');
    fireEvent.click(button);
    expect(setTier2AutoClickers).toHaveBeenCalledWith(2);
  });

  it('should update the tier 3 autoClicker count when clicked', () => {
    const setCount = jest.fn();
    const setTier3AutoClickers = jest.fn();
    const cookies = 5000;
    const tier3autoClickers = 1;
    const { getByTestId } = render(
      <AutoClickerButton
        tier={3}
        cookies={cookies}
        tier3AutoClickers={tier3autoClickers}
        setTier3AutoClickers={setTier3AutoClickers}
        setCount={setCount}
      />
    );
    const button = getByTestId('autoclicker-button');
    fireEvent.click(button);
    expect(setTier3AutoClickers).toHaveBeenCalledWith(2);
  });
});
