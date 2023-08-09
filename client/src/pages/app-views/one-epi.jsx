import { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import AudioMetadata from "../../functions/media-session.jsx";

function OneEpi(props) {
	const { userId, epiId, setPodId, setDocTitle } = props;

	function formatDate(date) {
		return new Date(date).toString().slice(0, 15);
	}

	const [showTitle, setShowTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [image, setImage] = useState("waiting.svg");
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(formatDate("2004-02-01T00:00:00Z"));
	const [epi, setEpi] = useState("");
	const [content, setContent] = useState("");

	const getEpisode = useCallback(async () => {
		let res = await axios.get(`${apiCall}/api/user/${userId}/${epiId}`);
		let item = res.data[0].podcasts;
		setShowTitle(item.show_title);
		setAuthor(item.author);
		setImage(item.image);
		setTitle(item.episodes.title);
		setDate(item.episodes.pubDate);
		setEpi(item.episodes.epi_url);
		setContent(item.episodes.content);
		setPodId(item.pod_id);
		setDocTitle(`${item.episodes.title} - Podder Fodder`);
	}, [epiId, setDocTitle, setPodId, userId]);

	useEffect(() => {
		getEpisode();
	}, [getEpisode]);

	return (
		<div className="Epi">
			<div className="oneEpi">
				<h3>{title}</h3>
				<h4 className="allEpiDuration">{formatDate(date)}</h4>
				<h4
					className="oneEpiShowTitle"
					id={props.podId}>
					{showTitle}
				</h4>
				<h4 className="allEpiAuthor">{author}</h4>
				<img
					className="epiImg"
					alt="podcast_image"
					src={image}
					height="250em"
				/>
				<audio
					className="audioPlayer"
					src={epi}
					controls
				/>
				<AudioMetadata
					podTitle={showTitle}
					epiTitle={title}
					author={author}
					audio={epi}
				/>
				<p className="oneEpiContent">{content}</p>
			</div>
		</div>
	);
}

OneEpi.propTypes = {
	userId: string,
	epiId: string,
	setPodId: func,
	podId: string,
	setDocTitle: func,
};

export default OneEpi;
