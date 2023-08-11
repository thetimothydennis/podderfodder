import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import EpiTitle from "../../components/mapped-data/all-epis/title.jsx";
import ShowTitle from "../../components/mapped-data/all-epis/show-title.jsx";
import Author from "../../components/mapped-data/all-epis/author.jsx";
import Duration from "../../components/mapped-data/all-epis/duration.jsx";
import Content from "../../components/mapped-data/all-epis/content.jsx";
import PubDate from "../../components/mapped-data/all-epis/pubdate.jsx";

function AllEpis(props) {
	const { userId, setDocTitle, setPodId, setEpiId } = props;
	const [episodes, setEpisodes] = useState([]);

	const getAllEpis = useCallback(async () => {
		let res = await axios.get(`${apiCall}/api/allepisodes/${userId}`);
		setEpisodes(res.data);
	}, [userId]);

	useEffect(() => {
		setDocTitle("All Episodes - Podder Fodder");
	}, [setDocTitle]);

	useEffect(() => {
		getAllEpis();
	}, [getAllEpis]);

	const handleClick = (e) => {
		setPodId(e.target.value);
		setEpiId(e.target.id);
	};

	return (
		<div className="Epi">
			<h3>All Episodes</h3>

			<div className="container">
				{episodes.map((item, x) => (
					<div
						className="row epiRow"
						onClick={handleClick}
						key={x}
						id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}>
						<EpiTitle item={item} />
						<ShowTitle item={item} />
						<Author item={item} />
						<Duration item={item} />
						<Content item={item} />
						<PubDate item={item} />
					</div>
				))}
			</div>
		</div>
	);
}

AllEpis.propTypes = {
	userId: string,
	setPodId: func,
	setEpiId: func,
	setDocTitle: func,
};

export default AllEpis;
