import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import ShowImage from "../../components/mapped-data/all-pods/show-image.jsx";
import ShowTitle from "../../components/mapped-data/all-pods/show-title.jsx";
import Author from "../../components/mapped-data/all-pods/author.jsx";
import Description from "../../components/mapped-data/all-pods/description.jsx";
import DeleteButton from "../../components/mapped-data/all-pods/delete-button.jsx";

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
						<ShowImage 
							item={item}
							handlePodClick={handlePodClick} />
						<ShowTitle
							item={item}
							handlePodClick={handlePodClick} />
						<Author
							item={item}
							handlePodClick={handlePodClick} />
						<Description
							item={item}
							handlePodClick={handlePodClick} />
						<DeleteButton
							item={item}
							handleDeleteClick={handleDeleteClick} />
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
