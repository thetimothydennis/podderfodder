import React from "react";
import { func, object, string, number } from "prop-types";
import EpiTitle from "./epi-title.jsx";
import Duration from "./duration.jsx";
import PubDate from "./pubdate.jsx";
import Content from "./content.jsx";
import DeleteButton from "./delete-button.jsx";

function BelowFold (props) {
    const { item, podId, handleClick, x } = props;
    return (
            <div
			    className="row epiRow"
				key={x}
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
    x: number
}

export default BelowFold;