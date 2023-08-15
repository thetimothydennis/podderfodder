import React from "react";

function Username() {
  return (
    <p className="row form-group">
      <label className="col-sm form-control" htmlFor="username">
        username
        <input
          className="col-sm form-control"
          type="text"
          name="username"
          id="username"
        />
      </label>
    </p>
  );
}

export default Username;
