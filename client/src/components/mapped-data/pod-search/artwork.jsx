import React from "react";
import { object } from "prop-types";

function Artwork({ item }) {
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
