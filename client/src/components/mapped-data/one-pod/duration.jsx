import React from "react";
import { object, string } from "prop-types";

function Duration({ item, podId }) {
  return (
    <div className="col-sm allEpiDuration" id={`${podId}/${item._id}`}>
      {item.duration} min.
    </div>
  );
}

Duration.propTypes = {
  item: object,
  podId: string,
};

export default Duration;
