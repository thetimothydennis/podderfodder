import React from "react";

function Name () {
    return (
        <p className="row form-group">
			<label
				className="col-sm form-control"
				htmlFor="name">
				name
			    <input
				className="col-sm form-control"
				type="text"
				name="name"
				id="name" />
			</label>
		</p>
    )
}

export default Name;