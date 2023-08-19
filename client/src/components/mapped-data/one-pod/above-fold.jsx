import React from "react";
import { string, func } from "prop-types";
import UpdateButton from "./update-button";

function AboveFold(props) {
  const { showTitle, showAuthor, showImg, showDesc, updatePod } = props;
  return (
    <div>
      <h3>{showTitle}</h3>
      <h4>{showAuthor}</h4>
      <img alt="podcast_image" height="250em" src={showImg} />
      <br />
      <UpdateButton updatePod={updatePod} />
      <p className="onePodDesc">{showDesc}</p>
    </div>
  );
}

AboveFold.propTypes = {
  showTitle: string,
  showAuthor: string,
  showImg: string,
  showDesc: string,
  updatePod: func,
};

export default AboveFold;
