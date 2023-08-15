import React from "react";
import { object } from "prop-types";

function Content(props) {
  const { item } = props;
  return (
    <div
      className="col-sm allEpiContent"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      {item.podcasts.episodes.content.slice(0, 100)}
    </div>
  );
}

Content.propTypes = {
  item: object,
};

export default Content;
