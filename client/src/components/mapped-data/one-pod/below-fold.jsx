import React from "react";
import { func, object, string, number } from "prop-types";
import EpiTitle from "./epi-title.jsx";
import Duration from "./duration.jsx";
import PubDate from "./pubdate.jsx";
import Content from "./content.jsx";
import DeleteButton from "./delete-button.jsx";

function BelowFold({ item, podId, handleClick, key }) {
  return (
    <div
      className="row epiRow"
      key={key}
      value={item._id}
      id={`${podId}/${item._id}`}
    >
      <EpiTitle {...{item, podId}} />
      <Duration {...{item, podId}} />
      <PubDate {...{item, podId}} />
      <Content {...{item, podId}} />
      <DeleteButton {...{item, podId, handleClick}} />
    </div>
  );
}

BelowFold.propTypes = {
  item: object,
  podId: string,
  handleClick: func,
  key: number,
};

export default BelowFold;
