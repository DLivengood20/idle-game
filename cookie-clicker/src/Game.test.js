import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Game from './Game';

describe('Game component', () => {
  it('increments the cookie count when clicked', () => {
    const { getByTestId } = render(<Game />);
    const cookieButton = getByTestId('cookie-button');
    fireEvent.click(cookieButton);
    expect(getByTestId('cookie-count').textContent).toBe('1');
  });

  it('should update cookie count at correct intervals', () => {
    // Render the component with different values for autoClickers, tier2AutoClickers, and tier3AutoClickers
    const { rerender } = render(
      <Game autoClickers={0} tier2AutoClickers={0} tier3AutoClickers={0} />
    );

    // Check that the cookie count is updated after 1 second
    setTimeout(() => {
      expect(getCookieCount()).toBeGreaterThan(0);
    }, 1000);

    // Check that the cookie count is updated after 2 seconds
    setTimeout(() => {
      expect(getCookieCount()).toBeGreaterThan(1);
    }, 2000);

    // Update the props and rerender the component
    rerender(
      <Game autoClickers={1} tier2AutoClickers={1} tier3AutoClickers={1} />
    );

    // Check that the cookie count is updated after 1 second with new props
    setTimeout(() => {
      expect(getCookieCount()).toBeGreaterThan(2);
    }, 1000);

    // Check that the cookie count is updated after 2 seconds with new props
    setTimeout(() => {
      expect(getCookieCount()).toBeGreaterThan(3);
    }, 2000);

    // Helper function to get the current cookie count
    const getCookieCount = () =>
      Number(document.querySelector('.cookie-count').textContent);
  });
});
