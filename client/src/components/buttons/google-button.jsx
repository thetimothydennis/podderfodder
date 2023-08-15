import React, { useState } from "react";

function GoogleButton() {
  const [googSrc, setGoogSrc] = useState("/buttons/google_normal.png");

  const handleGoogClick = () => {
    setGoogSrc("/buttons/google_pressed.png");
  };
  const handleGoogReset = () => {
    setGoogSrc("/buttons/google_normal.png");
  };

  return (
    <a
      className="col-sm"
      href="/google"
      style={{ pointerEvents: "all" }}
      onPointerEnter={handleGoogClick}
      onPointerDown={handleGoogClick}
      onGotPointerCapture={handleGoogClick}
      onPointerOver={handleGoogClick}
      onClick={handleGoogClick}
      onLostPointerCapture={handleGoogReset}
      onPointerOut={handleGoogReset}
      onPointerLeave={handleGoogReset}
      onPointerCancel={handleGoogReset}
      onPointerUp={handleGoogReset}
    >
      <img id="google" height="45px" alt="login with google" src={googSrc} />
    </a>
  );
}

export default GoogleButton;
