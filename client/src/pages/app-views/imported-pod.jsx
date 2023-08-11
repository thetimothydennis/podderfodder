import React, { useEffect } from "react";
import { func } from "prop-types";

function ImportedPod(props) {
	const { setDocTitle } = props;

	useEffect(() => {
		setDocTitle("Adding Pod - Podder Fodder");
	}, [setDocTitle]);

	return (
		<div className="Epi">
			<br />
			<p>Adding pod. You will be redirected momentarily.</p>
			<img
				className="waiting"
				src="waiting.svg"
				height="300em"
			/>
		</div>
	);
}

ImportedPod.propTypes = {
	setDocTitle: func,
};

export default ImportedPod;
