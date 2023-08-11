import React from "react";
import { string, func } from "prop-types";
import RSSLinkForm from "./rss-link-form";
import RSSSubmitButton from "./rss-submit-button";
import SearchApplePodsForm from "./search-apple-pods";

function Inputs (props) {
	

    const { input, setInput, feedInput, setFeedInput, handleSubmit } = props;
    return (
        <div className="container">
			<RSSLinkForm
				setFeedInput={setFeedInput}
				feedInput={feedInput} />
			<RSSSubmitButton
				handleSubmit={handleSubmit}
				feedInput={feedInput} />
			<p>or</p>
			<SearchApplePodsForm
				input={input}
				setInput={setInput} />
		</div>
    )
}

Inputs.propTypes = {
    input: string,
    setInput: func,
    feedInput: string,
    setFeedInput: func,
    handleSubmit: func
}

export default Inputs;