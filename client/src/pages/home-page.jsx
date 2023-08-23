import React, { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "Podder Fodder";
  }, []);

  return (
    <div className={"Epi"}>
      <h1>Podder Fodder</h1>
      <p>Welcome to PodderFodder!</p>
      <p>
        <a href="/login">Login</a> or <a href="/register">Register</a>
      </p>
      <p>
        NOTE: you must have cookies and JavaScript enabled to use this site.
      </p>
    </div>
  );
}

export default HomePage;