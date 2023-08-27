import React from "react";
import { object } from "prop-types";

function CollectionViewUrl({ item }) {
  return (
    <div className="col-md">
      <a href={item.collectionViewUrl} target="_blank" rel="noreferrer">
        More details
      </a>
    </div>
  );
}

CollectionViewUrl.propTypes = {
  item: object,
};

export default CollectionViewUrl;
