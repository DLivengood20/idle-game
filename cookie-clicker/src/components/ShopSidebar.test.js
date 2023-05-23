import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ShopSidebar from './ShopSidebar';

describe('ShopSidebar', () => {
  test('renders the sidebar closed by default', () => {
    const { container } = render(<ShopSidebar />);
    expect(container.querySelector('.sidebar')).toHaveClass('closed');
  });

  test('renders the sidebar open when the toggle button is clicked', () => {
    const { container, getByTestId } = render(<ShopSidebar />);
    const toggleButton = getByTestId('sidebar-toggle');

    fireEvent.click(toggleButton);

    expect(container.querySelector('.sidebar')).toHaveClass('open');
  });

  test('renders the sidebar closed when the toggle button is clicked twice', () => {
    const { container, getByTestId } = render(<ShopSidebar />);
    const toggleButton = getByTestId('sidebar-toggle');

    fireEvent.click(toggleButton);
    fireEvent.click(toggleButton);

    expect(container.querySelector('.sidebar')).toHaveClass('closed');
  });
});
