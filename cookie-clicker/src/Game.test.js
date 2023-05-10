import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import { act } from 'react-dom/test-utils';

describe('Game', () => {
  beforeEach(() => {
    document.cookie = 'cookies=0';
    document.cookie = 'tier1AutoClickers=0';
    document.cookie = 'tier2AutoClickers=0';
    document.cookie = 'tier3AutoClickers=0';
  });

  it('renders the Cookie component', () => {
    render(<Game />);
    expect(screen.getByTestId('cookie-component')).toBeInTheDocument();
  });

  it('renders the ClickerShop component', () => {
    render(<Game />);
    expect(screen.getByTestId('shop-component')).toBeInTheDocument();
  });

  it('updates cookie count when cookie is clicked', () => {
    render(<Game />);
    const cookie = screen.getByTestId('cookie-button');
    const cookieCount = screen.getByTestId('cookie-count');
    expect(cookieCount).toHaveTextContent('0');
    fireEvent.click(cookie);
    expect(cookieCount).toHaveTextContent('1');
  });

  it('loads cookies from browser storage', () => {
    document.cookie = 'cookies=100';
    render(<Game />);
    const cookieCount = screen.getByTestId('cookie-count');
    expect(cookieCount).toHaveTextContent('100');
  });

  it('loads auto-clickers from browser storage', () => {
    document.cookie = 'tier1AutoClickers=2';
    document.cookie = 'tier2AutoClickers=1';
    document.cookie = 'tier3AutoClickers=1';
    render(<Game />);
    const autoClickers = screen.getAllByTestId('autoclicker-button');
    const tier1AutoClickers = autoClickers[0];
    const tier2AutoClickers = autoClickers[1];
    const tier3AutoClickers = autoClickers[2];
    expect(tier1AutoClickers.textContent).toMatch('14 cookies');
    expect(tier2AutoClickers.textContent).toMatch('120 cookies');
    expect(tier3AutoClickers.textContent).toMatch('1200 cookies');
  });

  describe('auto-clickers increase cookie count by', () => {
    it('1/tick when clickers < 1000', () => {
      jest.useFakeTimers();
      document.cookie = 'tier1AutoClickers=1';
      render(<Game />);
      const cookieCount = screen.getByTestId('cookie-count');
      expect(cookieCount.textContent).toBe('0');

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent('1');

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent('2');
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent('3');
      jest.useRealTimers();
    });

    it('(clickers/10)/tick when 1000 <= clickers < 10000', () => {
      const testClickers = 2000;
      const expectedIncrease = Math.floor(testClickers / 10);
      jest.useFakeTimers();
      document.cookie = `tier1AutoClickers=${testClickers}`;
      render(<Game />);
      const cookieCount = screen.getByTestId('cookie-count');
      expect(cookieCount).toHaveTextContent('0');

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent(expectedIncrease);

      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent(expectedIncrease * 2);
      act(() => {
        jest.runOnlyPendingTimers();
      });

      expect(cookieCount).toHaveTextContent(expectedIncrease * 3);
      jest.useRealTimers();
    });

    it('(clickers/10)/tick when 10000 <= clickers < 100000', () => {
      const testClickers = 20000;
      const expectedIncrease = Math.floor(testClickers / 100);
      jest.useFakeTimers();
      document.cookie = `tier1AutoClickers=${testClickers}`;
      render(<Game />);
      const cookieCount = screen.getByTestId('cookie-count');
      expect(cookieCount).toHaveTextContent('0');

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(cookieCount).toHaveTextContent(expectedIncrease);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(cookieCount).toHaveTextContent(expectedIncrease * 2);

      act(() => {
        jest.runOnlyPendingTimers();
      });
      expect(cookieCount).toHaveTextContent(expectedIncrease * 3);

      jest.useRealTimers();
    });
  });
});
