import React from "react";
import { object, func } from "prop-types";

function AddPodButton({ item, handleSubmit }) {
  return (
    <div className="col-md">
      <button
        id={-4}
        type="button"
        className="btn btn-dark"
        onClick={() => {
          handleSubmit(item.feedUrl);
        }}
      >
        Add podcast
      </button>
    </div>
  );
}

AddPodButton.propTypes = {
  item: object,
  handleSubmit: func,
};

export default AddPodButton;
