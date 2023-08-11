import React from "react";
import { object, func } from "prop-types";

function Description (props) {
    const { item, handlePodClick } = props;
    return (
        <div
            className="col-sm"
            onClick={handlePodClick}
            id={item.podcasts._id}>
            {item.podcasts.description.slice(0, 250)}
        </div>
    )
}

Description.propTypes = {
    item: object,
    handlePodClick: func
}

export default Description;