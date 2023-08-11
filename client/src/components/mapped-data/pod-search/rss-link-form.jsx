import React from "react";
import { func, string } from "prop-types";

function RSSLinkForm (props) {
    const { setFeedInput, feedInput } = props;
    return (
            <form
				className="row form-group"
				onSubmit={(e) => e.preventDefault()}>
				<label
					className="col-sm form-control"
					htmlFor="feedInput">
					Input RSS feed URL
					<input
						name="feedInput"
						type="text"
						value={feedInput}
						onChange={(e) => setFeedInput(e.target.value)}
						className="col-sm form-control"
					/>
				</label>
			</form>
    )
}

RSSLinkForm.propTypes = {
    setFeedInput: func,
    feedInput: string
}

export default RSSLinkForm;