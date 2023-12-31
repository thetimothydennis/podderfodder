import React from "react";
import { func } from "prop-types";

function UpdateButton({ updatePod }) {
  return (
    <button
      id={-8}
      onClick={updatePod}
      type="button"
      className="btn btn-dark onePodBtn"
    >
      Update Pod Feed
    </button>
  );
}

UpdateButton.propTypes = {
  updatePod: func,
};

export default UpdateButton;
