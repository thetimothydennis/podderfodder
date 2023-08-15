import React from "react";
import { object, func } from "prop-types";

function ShowImage(props) {
  const { item, handlePodClick } = props;

  return (
    <div className="col-sm" onClick={handlePodClick} id={item.podcasts._id}>
      <img
        onClick={handlePodClick}
        alt="podcast_show_image"
        width="150"
        src={item.podcasts.image}
        id={item.podcasts_id}
      />
    </div>
  );
}

ShowImage.propTypes = {
  item: object,
  handlePodClick: func,
};

export default ShowImage;
