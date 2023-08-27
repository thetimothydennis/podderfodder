import React from "react";
import { object, string, func } from "prop-types";

function DeleteButton({ item, podId, handleClick }) {
  return (
    <div className="col-md-2">
      <button
        id={-7}
        type="button"
        className="btn btn-dark"
        value={`${podId}/${item._id}`}
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  );
}

DeleteButton.propTypes = {
  item: object,
  podId: string,
  handleClick: func,
};

export default DeleteButton;
