import React from "react";
import { object } from "prop-types";

function Content({ item }) {
  return (
    <div
      className="col-md-4 allEpiContent"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      {item.podcasts.episodes.content.slice(0, 200)}
    </div>
  );
}

Content.propTypes = {
  item: object,
};

export default Content;
