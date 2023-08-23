import React from "react";
import { string, func } from "prop-types";

function SearchApplePodsForm({ input, setInput }) {
  return (
    <form className="row form-group" onSubmit={(e) => e.preventDefault()}>
      <label className="col-sm form-control" htmlFor="searchInput">
        Type search term
        <input
          name="searchInput"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="col-sm form-control"
        />
      </label>
    </form>
  );
}

SearchApplePodsForm.propTypes = {
  input: string,
  setInput: func,
};

export default SearchApplePodsForm;
