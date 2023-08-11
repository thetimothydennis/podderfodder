import React from "react";
import { func, object, string, number } from "prop-types";
import EpiTitle from "./epi-title.jsx";
import Duration from "./duration.jsx";
import PubDate from "./pubdate.jsx";
import Content from "./content.jsx";
import DeleteButton from "./delete-button.jsx";

function BelowFold (props) {
    const { item, podId, handleClick, key } = props;
    return (
            <div
			    className="row epiRow"
				key={key}
				value={item._id}
				id={`${podId}/${item._id}`}>
				<EpiTitle
					item={item}
					podId={podId} />
				<Duration
					item={item}
					podId={podId} />
				<PubDate
					item={item}
					podId={podId} />
				<Content
					item={item}
					podId={podId} />
				<DeleteButton
					item={item}
					podId={podId}
					handleClick={handleClick} />
		</div>
    )
}

BelowFold.propTypes = {
    item: object,
    podId: string,
    handleClick: func,
    key: number
}

export default BelowFold;