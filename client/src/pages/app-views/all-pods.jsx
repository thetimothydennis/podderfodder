import { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";

function AllPods(props) {
	const { setDocTitle, setPodId, setDisplay, userId } = props;
	const [podcasts, setPodcasts] = useState([]);

	const getPods = useCallback(async () => {
		let res = await axios.get(`${apiCall}/api/user/${userId}/`);
		setPodcasts(res.data);
	}, [userId]);

	useEffect(() => {
		getPods();
	}, [getPods]);

	useEffect(() => {
		setDocTitle("All Podcasts - Podder Fodder");
	});

	async function handleDeleteClick(e) {
		await axios
			.delete(`${apiCall}/api/user/${userId}/${e.target.value}`)
			.then(() => {
				setDisplay("allPods");
			});
	}

	async function handlePodClick(e) {
		setPodId(e.target.id);
	}

	return (
		<div className="Epi">
			<h3>All Podcasts</h3>
			<div className="container">
				{podcasts.map((item, x) => (
					<div
						className="row epiRow"
						key={x}
						id={item.podcasts._id}>
						<div
							className="col-sm"
							onClick={handlePodClick}
							id={item.podcasts._id}>
							<img
								alt="podcast_show_image"
								width="150"
								src={item.podcasts.image}
							/>
						</div>
						<div
							className="col-sm"
							onClick={handlePodClick}
							id={item.podcasts._id}>
							<b>{item.podcasts.show_title}</b>
						</div>
						<div
							className="col-sm allEpiAuthor"
							onClick={handlePodClick}
							id={item.podcasts._id}>
							{item.podcasts.author}
						</div>
						<div
							className="col-sm"
							onClick={handlePodClick}
							id={item.podcasts._id}>
							{item.podcasts.description.slice(0, 250)}
						</div>
						<div
							className="col-sm"
							id={item.podcasts._id}
							onClick={handleDeleteClick}>
							<button
								id="-6"
								type="button"
								className="btn btn-dark"
								value={item.podcasts._id}
								onClick={handleDeleteClick}>
								Delete podcast
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

AllPods.propTypes = {
	userId: string,
	setPodId: func,
	setDisplay: func,
	setDocTitle: func,
};

export default AllPods;
