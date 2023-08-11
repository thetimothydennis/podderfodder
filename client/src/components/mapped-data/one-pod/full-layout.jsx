import React from "react";
import { string, func, array } from "prop-types";
import AboveFold from "./above-fold";
import BelowFold from "./below-fold";

function FullLayout (props) {
    const { 
        podId,
        episodes, 
        showTitle, 
        showAuthor, 
        showImg, 
        showDesc, 
        updatePod,
        handleClick
    } = props;
    return (
        <div className="Epi">
			<AboveFold
				showTitle={showTitle}
				showAuthor={showAuthor}
				showImg={showImg}
				showDesc={showDesc}
				updatePod={updatePod} />
			<div className="container">
				{episodes.map((item, x) => (
					<BelowFold
						item={item}
						podId={podId}
						handleClick={handleClick}
						key={x} />
				))}
			</div>
		</div>
    )
}

FullLayout.propTypes = {
    showTitle: string,
    showAuthor: string,
    showImg: string,
    showDesc: string,
    podId: string,
    updatePod: func,
    episodes: array,
    handleClick: func
}

export default FullLayout;