import React from "react";
import { object } from "prop-types";

function Artist({ item }) {
  return <div className="col-sm allEpiAuthor">{item.artistName}</div>;
}

Artist.propTypes = {
  item: object,
};

export default Artist;
