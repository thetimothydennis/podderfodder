import React from "react";
import { object, string, func } from "prop-types";

function DeleteButton(props) {
  const { item, podId, handleClick } = props;
  return (
    <div>
      <button
        id={-7}
        type="button"
        className="btn btn-dark"
        value={`${podId}/${item._id}`}
        onClick={handleClick}
      >
        Delete episode
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
