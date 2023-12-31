import React from "react";
import { object, func } from "prop-types";

function Description({ item, handlePodClick }) {
  return (
    <div className="col-md" onClick={handlePodClick} id={item.podcasts._id}>
      {item.podcasts.description.slice(0, 250)}
    </div>
  );
}

Description.propTypes = {
  item: object,
  handlePodClick: func,
};

export default Description;
