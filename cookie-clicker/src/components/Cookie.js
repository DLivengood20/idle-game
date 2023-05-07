import React from 'react';
import CookieImg from './cookie.png';
import './Cookie.css';

const Cookie = ({ cookies, onClick }) => {
  const displayedCookie = () => {
    switch (true) {
      case cookies < 1000:
        return cookies;
      case cookies < 10000:
        return `${cookies / 1000}k`;
      case cookies < 100000:
        const roundedCount = Math.floor(cookies / 10) / 100;
        return `${roundedCount}k`;
      default:
        return cookies;
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
      <div>
        Current cookies:
        <span className="cookie-count" data-testid="cookie-count">
          {displayedCookie()}
        </span>
      </div>
    </div>
  );
};

export default Cookie;
