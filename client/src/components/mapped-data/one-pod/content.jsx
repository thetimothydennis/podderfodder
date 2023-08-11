import React from "react";
import { object, string } from "prop-types";

function Content (props) {
    const { item, podId } = props;
    return (
        <div
            className="col-sm epiContent"
            id={`${podId}/${item._id}`}>
            {item.content.slice(0, 200)}...
        </div>
    )
}

Content.propTypes = {
    item: object,
    podId: string
}

export default Content;