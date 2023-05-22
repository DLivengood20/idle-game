import React, { useState } from 'react';
import './AutoClickerButton.css';

const AutoClickerButton = ({
  tier,
  cookies,
  autoClickers,
  tier2AutoClickers,
  setAutoClickers,
  setTier2AutoClickers,
  tier3AutoClickers,
  setTier3AutoClickers,
  setCount,
}) => {
  const [showAlert, setShowAlert] = useState(false); // State to control the visibility of the alert

  // Function to calculate the cost of an autoclicker based on its tier
  const getAutoclickerCost = (tier) => {
    switch (tier) {
      case 1:
        return autoClickers === 0
          ? 10
          : Math.round(10 * Math.pow(1.2, autoClickers));
      case 2:
        return tier2AutoClickers === 0
          ? 100
          : Math.round(100 * Math.pow(1.2, tier2AutoClickers));
      case 3:
        return tier3AutoClickers === 0
          ? 1000
          : Math.round(1000 * Math.pow(1.2, tier3AutoClickers));
      default:
        return 0;
    }
  };

  // Function called when the button is clicked
  const handleClick = () => {
    const cost = getAutoclickerCost(tier);
    if (cookies >= cost) {
      // Purchase the autoclicker and deduct the cost from the cookie count
      switch (tier) {
        case 1:
          setAutoClickers(autoClickers + 1);
          setCount(cookies - cost);
          break;
        case 2:
          setTier2AutoClickers(tier2AutoClickers + 1);
          setCount(cookies - cost);
          break;
        case 3:
          setTier3AutoClickers(tier3AutoClickers + 1);
          setCount(cookies - cost);
          break;
        default:
          break;
      }
    } else {
      // Show the alert by setting showAlert to true
      setShowAlert(true);
    }
  };

  // Function to hide the alert
  const hideAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="autoclicker-button-container">
      <button
        className="autoclicker-button"
        onClick={handleClick}
        data-testid="autoclicker-button"
      >
        Buy Tier {tier} Auto-clicker ({getAutoclickerCost(tier)} cookies)
      </button>
      {showAlert && (
        <div className="popup-container">
          <div>
            <p className="popup-message">
              You don't have enough cookies! Need {getAutoclickerCost(tier)}{' '}
              cookies.
            </p>
            <button className="popup-button" onClick={hideAlert}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoClickerButton;
