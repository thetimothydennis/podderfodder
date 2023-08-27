import React from "react";
import { object, string } from "prop-types";

function Content({ item, podId }) {
  return (
    <div className="col-md-3 epiContent" id={`${podId}/${item._id}`}>
      {item.content.slice(0, 200)}...
    </div>
  );
}

Content.propTypes = {
  item: object,
  podId: string,
};

export default Content;
