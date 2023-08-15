import React from "react";
import { object } from "prop-types";

function Artwork(props) {
  const { item } = props;
  return (
    <div className="col-sm">
      <img alt="podcast_image" src={item.artworkUrl100} />
    </div>
  );
}

Artwork.propTypes = {
  item: object,
};

export default Artwork;
