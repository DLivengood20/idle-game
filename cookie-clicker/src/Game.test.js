import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';
import { act } from 'react-dom/test-utils';

// Helper function to simulate the passage of time
const simulateTimePassage = () => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
};

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

  it('renders the AutoClickerDisplay component when there are autoclickers', () => {
    document.cookie = 'tier1AutoClickers=1';
    render(<Game />);
    expect(screen.getByTestId('clicker-displays')).toBeInTheDocument();
  });

  it('does not render the ClickerShop component when 0 autoclickers', () => {
    render(<Game />);
    expect(document.getElementsByClassName('clicker-displays').length).toBe(0);
  });

  it('renders the ClickerShop component', () => {
    render(<Game />);
    expect(screen.getByTestId('shop-component')).toBeInTheDocument();
  });

  it('renders the Game component with initial state', () => {
    render(<Game />);
    const cookieCount = screen.getByTestId('cookie-count');
    const autoClickers = screen.getAllByTestId('autoclicker-button');

    expect(cookieCount).toHaveTextContent('0');
    expect(autoClickers[0]).toHaveTextContent('0');
    expect(autoClickers[1]).toHaveTextContent('0');
    expect(autoClickers[2]).toHaveTextContent('0');
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

  it('loads tier 1 auto-clickers from browser storage', () => {
    document.cookie = 'tier1AutoClickers=2';
    render(<Game />);
    const tier1AutoClickers = screen.getAllByTestId('autoclicker-button')[0];
    expect(tier1AutoClickers.textContent).toMatch('14 cookies');
  });

  it('loads tier 2 auto-clickers from browser storage', () => {
    document.cookie = 'tier2AutoClickers=1';
    render(<Game />);
    const tier2AutoClickers = screen.getAllByTestId('autoclicker-button')[1];
    expect(tier2AutoClickers.textContent).toMatch('120 cookies');
  });

  it('loads tier 3 auto-clickers from browser storage', () => {
    document.cookie = 'tier3AutoClickers=1';
    render(<Game />);
    const tier3AutoClickers = screen.getAllByTestId('autoclicker-button')[2];
    expect(tier3AutoClickers.textContent).toMatch('1200 cookies');
  });

  describe('autoclickers increase when purchased', () => {
    it('tier 1', () => {
      document.cookie = 'cookies=10000';
      render(<Game />);
      const buyTier1AutoClicker =
        screen.getAllByTestId('autoclicker-button')[0];

      let expectedCost = Math.floor(10 * 1.2);
      fireEvent.click(buyTier1AutoClicker);
      expect(buyTier1AutoClicker.textContent).toMatch(expectedCost.toString());

      expectedCost = Math.floor(expectedCost * 1.2);
      fireEvent.click(buyTier1AutoClicker);
      expect(buyTier1AutoClicker.textContent).toMatch(expectedCost.toString());
    });

    it('tier 2', () => {
      document.cookie = 'cookies=10000';
      render(<Game />);
      const buyTier2AutoClicker =
        screen.getAllByTestId('autoclicker-button')[1];

      let expectedCost = Math.floor(100 * 1.2);
      fireEvent.click(buyTier2AutoClicker);
      expect(buyTier2AutoClicker.textContent).toMatch(expectedCost.toString());

      expectedCost = Math.floor(expectedCost * 1.2);
      fireEvent.click(buyTier2AutoClicker);
      expect(buyTier2AutoClicker.textContent).toMatch(expectedCost.toString());
    });

    it('tier 3', () => {
      document.cookie = 'cookies=100000';
      render(<Game />);
      const buyTier3AutoClicker =
        screen.getAllByTestId('autoclicker-button')[2];

      let expectedCost = Math.floor(1000 * 1.2);
      fireEvent.click(buyTier3AutoClicker);
      expect(buyTier3AutoClicker.textContent).toMatch(expectedCost.toString());

      expectedCost = Math.floor(expectedCost * 1.2);
      fireEvent.click(buyTier3AutoClicker);
      expect(buyTier3AutoClicker.textContent).toMatch(expectedCost.toString());
    });
  });

  describe('auto-clickers deduct cost when purchased', () => {
    it('tier 1 cost 10 at inital then 12', () => {
      document.cookie = 'cookies=100';
      render(<Game />);
      const tier1AutoClickers = screen.getAllByTestId('autoclicker-button')[0];
      const cookieCount = screen.getByTestId('cookie-count');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('90');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('78');
    });

    it('tier 2 cost 100 at inital then 120', () => {
      document.cookie = 'cookies=1000';
      render(<Game />);
      const tier1AutoClickers = screen.getAllByTestId('autoclicker-button')[1];
      const cookieCount = screen.getByTestId('cookie-count');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('900');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('780');
    });

    it('tier 3 cost 1000 at inital then 1200', () => {
      document.cookie = 'cookies=10000';
      render(<Game />);
      const tier1AutoClickers = screen.getAllByTestId('autoclicker-button')[2];
      const cookieCount = screen.getByTestId('cookie-count');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('9k');

      fireEvent.click(tier1AutoClickers);
      expect(cookieCount).toHaveTextContent('7.8k');
    });
  });

  describe('auto-clickers increase cookie count by', () => {
    it('1/tick when clickers < 1000', () => {
      jest.useFakeTimers();
      document.cookie = 'tier1AutoClickers=1';
      render(<Game />);
      const cookieCount = screen.getByTestId('cookie-count');
      expect(cookieCount.textContent).toBe('0');

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent('1');

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent('2');

      simulateTimePassage();
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

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent(expectedIncrease);

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent(expectedIncrease * 2);

      simulateTimePassage();
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

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent(expectedIncrease);

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent(expectedIncrease * 2);

      simulateTimePassage();
      expect(cookieCount).toHaveTextContent(expectedIncrease * 3);

      jest.useRealTimers();
    });
  });
});
