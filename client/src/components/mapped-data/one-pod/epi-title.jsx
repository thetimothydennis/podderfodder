import React from "react";
import { object, string } from "prop-types";

function EpiTitle({ item, podId }) {
  return (
    <div className="col-md-2" id={`${podId}/${item._id}`}>
      <b>{item.title}</b>
    </div>
  );
}

EpiTitle.propTypes = {
  item: object,
  podId: string,
};

export default EpiTitle;
