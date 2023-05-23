import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ResetButton from '../ResetButton';

describe('ResetButton', () => {
  test('renders the reset button', () => {
    const { getByText } = render(<ResetButton />);
    const resetButton = getByText('Reset Game');
    expect(resetButton).toBeInTheDocument();
  });

  test('shows confirmation popup when reset button is clicked', () => {
    const { getByText, getByTestId } = render(<ResetButton />);
    const resetButton = getByText('Reset Game');

    fireEvent.click(resetButton);

    const confirmationPopup = getByTestId('confirmation-popup');
    expect(confirmationPopup).toBeInTheDocument();
  });

  test('resets the game when confirm button is clicked', () => {
    const mockSetCount = jest.fn();
    const mockSetTier1AutoClickers = jest.fn();
    const mockSetTier2AutoClickers = jest.fn();
    const mockSetTier3AutoClickers = jest.fn();

    const { getByText } = render(
      <ResetButton
        setCount={mockSetCount}
        setTier1AutoClickers={mockSetTier1AutoClickers}
        setTier2AutoClickers={mockSetTier2AutoClickers}
        setTier3AutoClickers={mockSetTier3AutoClickers}
      />
    );

    const resetButton = getByText('Reset Game');
    fireEvent.click(resetButton);

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockSetCount).toHaveBeenCalledWith(0);
    expect(mockSetTier1AutoClickers).toHaveBeenCalledWith(0);
    expect(mockSetTier2AutoClickers).toHaveBeenCalledWith(0);
    expect(mockSetTier3AutoClickers).toHaveBeenCalledWith(0);
  });

  test('cancels the reset when cancel button is clicked', () => {
    const { getByText, queryByTestId } = render(<ResetButton />);
    const resetButton = getByText('Reset Game');

    fireEvent.click(resetButton);

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    const confirmationPopup = queryByTestId('confirmation-popup');
    expect(confirmationPopup).not.toBeInTheDocument();
  });
});
