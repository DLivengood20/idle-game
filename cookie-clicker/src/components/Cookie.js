import React from 'react';
import CookieImg from '../assets/cookie.png';
import './styles/Cookie.css';

const Cookie = ({ cookies, onClick }) => {
  // Function to determine the displayed cookie count
  const displayedCookie = () => {
    let roundedCount;
    switch (true) {
      case cookies < 1000:
        return cookies; // Display the exact count if less than 1000
      case cookies < 10000:
        return `${cookies / 1000}k`; // Display count in thousands (e.g., 1.555k)
      case cookies < 100000:
        roundedCount = Math.floor(cookies / 10) / 100; // Round the count to two decimal places
        return `${roundedCount}k`; // Display count in thousands (e.g., 15.55k)
      case cookies < 1000000:
        roundedCount = Math.floor(cookies / 100) / 10; // Round the count to one decimal place
        return `${roundedCount}k`; // Display count in thousands (e.g., 115.5k)
      default:
        return cookies; // Display the exact count for larger numbers
    }
  };

  return (
    <div className="cookie-component" data-testid="cookie-component">
      <div
        className="cookie-container"
        onClick={onClick}
        data-testid="cookie-button"
      >
        <img src={CookieImg} alt="Cookie" />
      </div>
      <div className="count-display">
        Current cookies:
        <span className="cookie-count" data-testid="cookie-count">
          {displayedCookie()}
          {/* Display the calculated cookie count */}
        </span>
      </div>
    </div>
  );
};

export default Cookie;
