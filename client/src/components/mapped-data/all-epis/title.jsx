import React from "react";
import { object } from "prop-types";

function EpiTitle({ item }) {
  return (
    <div
      className="col-sm"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      <b>{item.podcasts.episodes.title}</b>
    </div>
  );
}

EpiTitle.propTypes = {
  item: object,
};

export default EpiTitle;
