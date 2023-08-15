import React, { useEffect } from "react";
import { func } from "prop-types";

function DeleteEpi(props) {
  const { setDocTitle } = props;

  useEffect(() => {
    setDocTitle("Episode Deleted - Podder Fodder");
  }, [setDocTitle]);

  return (
    <div className="Epi">
      <br />
      <p>Episode deleted</p>
      <img className="waiting" src="waiting.svg" height="300em" />
    </div>
  );
}

DeleteEpi.propTypes = {
  setDocTitle: func,
};

export default DeleteEpi;
