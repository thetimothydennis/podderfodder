import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import TableRender from "../../components/mapped-data/pod-search/table-render.jsx";
import Inputs from "../../components/mapped-data/pod-search/inputs.jsx";

function PodSearch(props) {
	const { userId, setPodId, setDisplay, setDocTitle } = props;

	const [input, setInput] = useState("");
	const [response, setResponse] = useState([]);
	const [feedInput, setFeedInput] = useState("");
	const [render, setRender] = useState();

	async function getSearch(inputStr) {
		let res = await axios.get(`${apiCall}/api/search?q=${inputStr}`);
		setResponse(res.data.results);
	}

	const handleSubmit = useCallback(
		async (inputArg) => {
			setRender(<p>Waiting</p>);
			await axios
				.post(`${apiCall}/api/user/${userId}`, { feedurl: inputArg,	})
				.then((res) => {
					let pod_id = res.data[0].podcasts.pod_id;
					setPodId(pod_id);
					setDisplay("onePod");
				});
		}, [setPodId, setDisplay, userId]
	);

	useEffect(() => { 
		setDocTitle("Search and Add - Podder Fodder");
	}, [setDocTitle]);

	useEffect(() => { getSearch(input); }, [input]);

	useEffect(() => {
		setRender(response.map((item, x) => (
				<TableRender 
					key={x}
					item={item}
					handleSubmit={handleSubmit} />
		))); }, [input, response, handleSubmit]);

	return (
		<div>
			<h3>Search for Podcasts</h3>
			<Inputs
				input={input}
				setInput={setInput}
				feedInput={feedInput}
				setFeedInput={setFeedInput}
				handleSubmit={handleSubmit} />
			<div className="container">{render}</div>
		</div>
	);
}

PodSearch.propTypes = {
	userId: string,
	setPodId: func,
	setDisplay: func,
	setDocTitle: func,
};

export default PodSearch;
