import React from "react";
import { object } from "prop-types";

function Duration({ item }) {
  return (
    <div
      className="col-md-1 allEpiDuration"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      {item.podcasts.episodes.duration} min.
    </div>
  );
}

Duration.propTypes = {
  item: object,
};

export default Duration;
