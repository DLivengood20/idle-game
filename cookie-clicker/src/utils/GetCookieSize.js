function GetCookieSize() {
  if (window.innerWidth < 400) {
    return 160;
  } else {
    return 320;
  }
}

export default GetCookieSize;
