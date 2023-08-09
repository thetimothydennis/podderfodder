import { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";

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
						<div
							className="col-sm"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							<b>{item.podcasts.episodes.title}</b>
						</div>
						<div
							className="col-sm allEpiAuthor"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							{item.podcasts.show_title}
						</div>
						<div
							className="col-sm allEpiAuthor"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							{item.podcasts.author.slice(0, 25)}
						</div>
						<div
							className="col-sm allEpiDuration"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							{item.podcasts.episodes.duration} min.
						</div>
						<div
							className="col-sm allEpiContent"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							{item.podcasts.episodes.content.slice(0, 100)}
						</div>
						<div
							className="col-sm allEpiDuration"
							id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
							value={item.podcasts.pod_id}>
							{item.podcasts.episodes.pubDate
								.toString()
								.slice(0, 10)}
						</div>
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
