import React from "react";
import { object, func } from "prop-types";
import CollectionName from "./collection-name";
import Artwork from "./artwork";
import Artist from "./artist-name";
import CollectionViewUrl from "./collection-view-url";
import AddPodButton from "./add-pod-button";

function TableRender(props) {
  const { item, handleSubmit } = props;
  return (
    <div className="row epiRow" key={item.collectionId}>
      <CollectionName {...{item}} />
      <Artwork {...{item}} />
      <Artist {...{item}} />
      <CollectionViewUrl {...{item}} />
      <AddPodButton {...{item, handleSubmit}} />
    </div>
  );
}

TableRender.propTypes = {
  item: object,
  handleSubmit: func,
};

export default TableRender;
