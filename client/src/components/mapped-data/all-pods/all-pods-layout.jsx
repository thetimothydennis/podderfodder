import React from "react";
import { func, array } from "prop-types";
import ShowImage from "./show-image";
import ShowTitle from "./show-title";
import Author from "./author";
import Description from "./description";
import DeleteButton from "./delete-button";

function FullLayout({ podcasts, handlePodClick, handleDeleteClick }) {
  return (
    <div className="Epi">
      <h3>All Podcasts</h3>
      <div className="container">
        {podcasts.map((item, x) => (
          <div className="row epiRow" key={x} id={item.podcasts._id}>
            <ShowImage {...{item, handlePodClick}} />
            <ShowTitle {...{item, handlePodClick}} />
            <Author {...{item, handlePodClick}} />
            <Description {...{item, handlePodClick}} />
            <DeleteButton {...{item, handleDeleteClick}} />
          </div>
        ))}
      </div>
    </div>
  );
}

FullLayout.propTypes = {
  podcasts: array,
  handlePodClick: func,
  handleDeleteClick: func,
};

export default FullLayout;
