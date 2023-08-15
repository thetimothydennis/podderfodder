import React, { useEffect } from "react";
import { func } from "prop-types";

function Welcome(props) {
  useEffect(() => {
    props.setDocTitle("Podder Fodder");
  }, [props]);

  return (
    <div>
      <h1>Podder Fodder</h1>
      <p>Welcome to PodderFodder. Use the links above to navigate</p>
      <p>
        You can change your password <a href="/changepassword">here</a>.
      </p>
    </div>
  );
}

Welcome.propTypes = {
  setDocTitle: func,
};

export default Welcome;
