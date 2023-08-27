import React from "react";
import { object } from "prop-types";

function PubDate({ item }) {
  return (
    <div
      className="col-md-2 allEpiDuration"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      {item.podcasts.episodes.pubDate.toString().slice(0, 10)}
    </div>
  );
}

PubDate.propTypes = {
  item: object,
};

export default PubDate;
