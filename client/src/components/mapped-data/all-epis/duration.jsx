import React from "react";
import { object } from "prop-types";

function Duration(props) {
  const { item } = props;
  return (
    <div
      className="col-sm allEpiDuration"
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
