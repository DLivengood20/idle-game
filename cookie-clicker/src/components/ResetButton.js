import React, { useState } from 'react';
import './styles/ResetButton.css';

const ResetButton = ({
  setCount,
  setTier1AutoClickers,
  setTier2AutoClickers,
  setTier3AutoClickers,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const resetGame = () => {
    setCount(0);
    setTier1AutoClickers(0);
    setTier2AutoClickers(0);
    setTier3AutoClickers(0);
    setShowConfirmation(false);
  };

  const handleResetClick = () => {
    setShowConfirmation(true);
  };

  const handleCancelClick = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="reset-button-container">
      <button className="reset-button" onClick={handleResetClick}>
        Reset Game
      </button>
      {showConfirmation && (
        <div className="overlay">
          <div className="confirmation-popup" data-testid="confirmation-popup">
            <p>Are you sure you want to reset the game?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={resetGame}>
                Confirm
              </button>
              <button className="cancel-button" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetButton;
