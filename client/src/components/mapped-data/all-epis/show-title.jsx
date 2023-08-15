import React from "react";
import { object } from "prop-types";

function ShowTitle(props) {
  const { item } = props;
  return (
    <div
      className="col-sm allEpiAuthor"
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
