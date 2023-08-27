import React from "react";
import { object } from "prop-types";

function ShowTitle({ item }) {
  return (
    <div
      className="col-md-2 allEpiAuthor"
      id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
      value={item.podcasts.pod_id}
    >
      {item.podcasts.show_title}
    </div>
  );
}

ShowTitle.propTypes = {
  item: object,
};

export default ShowTitle;
