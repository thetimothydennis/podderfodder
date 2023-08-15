import React from "react";
import { object } from "prop-types";

function CollectionName(props) {
  const { item } = props;
  return (
    <div className="col-sm">
      <b>{item.collectionName}</b>
    </div>
  );
}

CollectionName.propTypes = {
  item: object,
};

export default CollectionName;
