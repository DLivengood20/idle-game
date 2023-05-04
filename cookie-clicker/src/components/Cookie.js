import React from 'react';
import CookieImg from './cookie.png';

const Cookie = ({ cookies, onClick }) => {
  return (
    <div>
      <img src={CookieImg} alt="Cookie" onClick={onClick} />
      <div>Current cookies: {cookies}</div>
    </div>
  );
};

export default Cookie;
