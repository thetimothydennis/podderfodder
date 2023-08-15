import React, { useEffect } from "react";
import { func } from "prop-types";

function UpdatePod(props) {
  const { setDocTitle } = props;

  useEffect(() => {
    setDocTitle("Updating Pod - Podder Fodder");
  }, [setDocTitle]);

  return (
    <div className="Epi">
      <br />
      <p>Updating pod. You will be redirected shortly.</p>
      <img className="waiting" src="waiting.svg" height="300em" />
    </div>
  );
}

UpdatePod.propTypes = {
  setDocTitle: func,
};

export default UpdatePod;
