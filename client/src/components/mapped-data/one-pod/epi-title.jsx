import React from "react";
import { object, string } from "prop-types";

function EpiTitle(props) {
  const { item, podId } = props;
  return (
    <div className="col-sm" id={`${podId}/${item._id}`}>
      <b>{item.title}</b>
    </div>
  );
}

EpiTitle.propTypes = {
  item: object,
  podId: string,
};

export default EpiTitle;
