import React from "react";
import { object } from "prop-types";

function CollectionViewUrl (props) {
    const { item } = props;
    return (
        <div className="col-sm">
            <a
                href={item.collectionViewUrl}
                target="_blank"
                rel="noreferrer">
                More details
            </a>
        </div>
    )
}

CollectionViewUrl.propTypes = {
    item: object
}

export default CollectionViewUrl;