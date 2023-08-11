import React from "react";
import { object } from "prop-types";

function Author (props) {
    const {item } = props;
    return (
            <div
				className="col-sm allEpiAuthor"
				id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
				value={item.podcasts.pod_id}>
				{item.podcasts.author.slice(0, 25)}
			</div>
    )
}

Author.propTypes = {
    item: object
}

export default Author;