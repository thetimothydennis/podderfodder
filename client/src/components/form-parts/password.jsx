import React from "react";

function Password () {
    return (
        <p className="row form-group">
        <label
            className="col-sm form-control"
            htmlFor="password">
            password
            <input
                className="col-sm form-control"
                type="password"
                name="password"
                id="password" />
        </label>
    </p>
    )
}

export default Password;