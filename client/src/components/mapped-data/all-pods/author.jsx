import React from "react";
import { object, func } from "prop-types";

function Author({ item, handlePodClick }) {
  return (
    <div
      className="col-sm allEpiAuthor"
      onClick={handlePodClick}
      id={item.podcasts._id}
    >
      {item.podcasts.author}
    </div>
  );
}

Author.propTypes = {
  item: object,
  handlePodClick: func,
};

export default Author;
