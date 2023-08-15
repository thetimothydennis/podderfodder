import React from "react";
import { object, string } from "prop-types";

function PubDate(props) {
  const { item, podId } = props;
  return (
    <div className="col-sm allEpiDuration" id={`${podId}/${item._id}`}>
      {item.pubDate.toString().slice(0, 10)}
    </div>
  );
}

PubDate.propTypes = {
  item: object,
  podId: string,
};

export default PubDate;
