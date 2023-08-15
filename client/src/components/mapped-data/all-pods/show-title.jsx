import React from "react";
import { object, func } from "prop-types";

function ShowTitle(props) {
  const { item, handlePodClick } = props;

  return (
    <div className="col-sm" onClick={handlePodClick} id={item.podcasts._id}>
      <b>{item.podcasts.show_title}</b>
    </div>
  );
}

ShowTitle.propTypes = {
  item: object,
  handlePodClick: func,
};

export default ShowTitle;
