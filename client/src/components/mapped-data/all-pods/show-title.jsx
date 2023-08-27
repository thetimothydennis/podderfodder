import React from "react";
import { object, func } from "prop-types";

function ShowTitle({ item, handlePodClick }) {
  return (
    <div className="col-md" onClick={handlePodClick} id={item.podcasts._id}>
      <b>{item.podcasts.show_title}</b>
    </div>
  );
}

ShowTitle.propTypes = {
  item: object,
  handlePodClick: func,
};

export default ShowTitle;
