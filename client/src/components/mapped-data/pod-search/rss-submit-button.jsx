import React from "react";
import { func, string } from "prop-types";

function RSSSubmitButton({ handleSubmit, feedInput }) {
  return (
    <button
      id={-4}
      type="button"
      className="btn btn-dark"
      onClick={() => handleSubmit(feedInput)}
    >
      Submit feed
    </button>
  );
}

RSSSubmitButton.propTypes = {
  handleSubmit: func,
  feedInput: string,
};

export default RSSSubmitButton;
