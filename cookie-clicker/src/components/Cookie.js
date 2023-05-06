import React from 'react';
import CookieImg from './cookie.png';
import './Cookie.css';

const Cookie = ({ cookies, onClick }) => {
  const displayedCookie = () => {
    switch (true) {
      case cookies < 1000:
        return cookies;
      case cookies < 10000:
        return `${(cookies / 1000).toFixed(3)}k`;
      case cookies < 100000:
        return `${(cookies / 1000).toFixed(2)}k`;
      default:
        return cookies;
    }
  };

  return (
    <div className="cookie-component">
      <div className="cookie-container" onClick={onClick}>
        <img src={CookieImg} alt="Cookie" />
      </div>
      <div>Current cookies: {displayedCookie()}</div>
    </div>
  );
};

export default Cookie;
