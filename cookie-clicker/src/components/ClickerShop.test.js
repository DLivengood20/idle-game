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

  it('should update the cookie count when an AutoClickerButton is clicked', () => {
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

    const button = getAllByTestId('autoclicker-button');
    fireEvent.click(button[0]);
    expect(setCount).toHaveBeenCalledWith(9989);
    fireEvent.click(button[1]);
    expect(setCount).toHaveBeenCalledWith(9899);
    fireEvent.click(button[2]);
    expect(setCount).toHaveBeenCalledWith(8999);
  });
});
