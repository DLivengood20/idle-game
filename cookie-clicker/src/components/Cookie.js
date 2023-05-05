import React from 'react';
import CookieImg from './cookie.png';
import './Cookie.css';

const Cookie = ({ cookies, onClick }) => {
  return (
    <div className="cookie-component">
      <div className="cookie-container" onClick={onClick}>
        <img src={CookieImg} alt="Cookie" />
      </div>
      <div>Current cookies: {cookies}</div>
    </div>
  );
};

export default Cookie;
