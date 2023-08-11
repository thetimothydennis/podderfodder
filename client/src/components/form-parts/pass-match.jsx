import React from "react";

function PassMatch () {
    return (
        <p className="row form-group">
        <label
            className="col-sm form-control"
            htmlFor="password">
            re-enter password
            <input
                className="col-sm form-control"
                type="password"
                name="passwordMatch"
                id="passwordMatch" />
        </label>
    </p>
    )
}

export default PassMatch;