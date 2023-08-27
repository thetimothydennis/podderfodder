import React from "react";
import { string, func } from "prop-types";
import UpdateButton from "./update-button";

function AboveFold({ showTitle, showAuthor, showImg, showDesc, handleDeletePod, updatePod }) {
  return (
    <div className="onePodTop">
      <h3>{showTitle}</h3>
      <h4>{showAuthor}</h4>
      <img alt="podcast_image" height="250em" src={showImg} />
      <br />
      <UpdateButton {...{updatePod}} />
      <button
        onClick={handleDeletePod}
        type="button"
        className="btn btn-dark onePodBtn"
      >
        Delete Pod
      </button>
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
