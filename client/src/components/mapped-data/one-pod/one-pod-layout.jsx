import React from "react";
import { string, func, array } from "prop-types";
import AboveFold from "./above-fold";
import BelowFold from "./below-fold";

function FullLayout(props) {
  const {
    podId,
    episodes,
    showTitle,
    showAuthor,
    showImg,
    showDesc,
    updatePod,
    handleClick,
  } = props;
  return (
    <div className="Epi container">
        <AboveFold {...{showTitle, showAuthor, showImg, showDesc, updatePod}} />
        {episodes.map((item, x) => (
          <BelowFold
            {...{item, podId, handleClick}}
            key={x}
          />
        ))}
    </div>
  );
}

FullLayout.propTypes = {
  showTitle: string,
  showAuthor: string,
  showImg: string,
  showDesc: string,
  podId: string,
  updatePod: func,
  episodes: array,
  handleClick: func,
};

export default FullLayout;
