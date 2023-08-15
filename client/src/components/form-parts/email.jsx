import React from "react";

function Email() {
  return (
    <p className="row form-group">
      <label className="col-sm form-control" htmlFor="email">
        email
        <input
          className="col-sm form-control"
          type="text"
          name="email"
          id="email"
        />
      </label>
    </p>
  );
}

export default Email;
