import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders header and game component', () => {
    const { getByText, getByTestId } = render(<App />);
    const headerElement = getByText(/cookie clicker/i);
    const gameElement = getByTestId('game-component');
    expect(headerElement).toBeInTheDocument();
    expect(gameElement).toBeInTheDocument();
  });
});
