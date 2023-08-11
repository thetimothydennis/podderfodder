import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import FullLayout from "../../components/mapped-data/one-pod/full-layout.jsx";

function OnePod(props) {
	const { userId, podId, setDocTitle, setPodId, setDisplay } = props;

	const [episodes, setEpisodes] = useState([]);
	const [showTitle, setShowTitle] = useState("");
	const [showDesc, setShowDesc] = useState("");
	const [showImg, setShowImg] = useState("waiting.svg");
	const [showAuthor, setShowAuthor] = useState("");

	const getPodcasts = useCallback(async () => {
		let res = await axios.get(`${apiCall}/api/user/${userId}/${podId}`);
		let { show_title, description, image, author, episodes } =
			res.data[0].podcasts;
		setShowTitle(show_title);
		setShowDesc(description);
		setShowImg(image);
		setEpisodes(episodes);
		setShowAuthor(author);
		setDocTitle(`${show_title} - Podder Fodder`);
	}, [setDocTitle, podId, userId]);

	const updatePod = async () => {
		await axios
			.put(`${apiCall}/api/user/${userId}/${podId}`)
			.then((res) => {
				setPodId(res.data[0].podcasts.pod_id);
				setDisplay("onePod");
			});
	};

	useEffect(() => { getPodcasts(); }, [getPodcasts]);

	const handleClick = async (e) => {
		await axios
			.delete(`${apiCall}/api/user/${userId}/${e.target.value}`)
			.then(() => { setDisplay("onePod"); });
	};

	return (
		<FullLayout
			podId={podId}
			showTitle={showTitle}
			showAuthor={showAuthor}
			showImg={showImg}
			showDesc={showDesc}
			updatePod={updatePod}
			handleClick={handleClick}
			episodes={episodes} />
	);
}

OnePod.propTypes = {
	userId: string,
	podId: string,
	setPodId: func,
	setDisplay: func,
	setDocTitle: func,
};

export default OnePod;
