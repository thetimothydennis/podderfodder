import { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import NavBar from "./pages/pod-nav-bar.jsx";
import Welcome from "./pages/welcome.jsx";
import PodSearch from "./pages/app-views/pod-search.jsx";
import AllPods from "./pages/app-views/all-pods.jsx";
import OnePod from "./pages/app-views/one-pod.jsx";
import OneEpi from "./pages/app-views/one-epi.jsx";
import AllEpis from "./pages/app-views/all-epis.jsx";
import { apiCall } from "./functions/api-call.jsx";
import UpdatePod from "./pages/app-views/update-pod.jsx";
import DeletePod from "./pages/app-views/delete-pod.jsx";
import DeleteEpi from "./pages/app-views/delete-epi.jsx";
import ImportedPod from "./pages/app-views/imported-pod.jsx";
import "./App.css";

function MainUi(props) {
	const [display, setDisplay] = useState("");
	const [podId, setPodId] = useState("");
	const [epiId, setEpiId] = useState("");
	const [render, setRender] = useState(
		<p>Please wait, loading your user profile.</p>
	);
	const [userId, setUserId] = useState("");
	const [docTitle, setDocTitle] = useState("Podder Fodder");
	const cookie = new Cookies();

	async function getUserId() {
		if (cookie.get("userId") === "" || !cookie.get("userId")) {
			let res = await axios.get(`${apiCall}/api/user-data`);
			cookie.set("userId", res.data.user_id);
		}
		setUserId(cookie.get("userId"));
	}

	useEffect(() => {
		getUserId();
	});

	useEffect(() => {
		document.title = docTitle;
	}, [docTitle]);

	useEffect(() => {
		setDisplay("welcome");
		setRender(<Welcome userId={userId} />);
	}, [userId]);

	//logic for re-rendering the current display
	useEffect(() => {
		switch (display) {
			case "allPods":
				setRender(
					<AllPods
						userId={userId}
						setDocTitle={setDocTitle}
						setPodId={setPodId}
						setDisplay={setDisplay}
					/>
				);
				break;
			case "onePod":
				setRender(
					<OnePod
						userId={userId}
						setDocTitle={setDocTitle}
						podId={podId}
						setPodId={setPodId}
						setDisplay={setDisplay}
					/>
				);
				break;
			case "oneEpi":
				setRender(
					<OneEpi
						userId={userId}
						setDocTitle={setDocTitle}
						podId={podId}
						epiId={epiId}
						setPodId={setPodId}
					/>
				);
				break;
			case "allEpis":
				setRender(
					<AllEpis
						userId={userId}
						setDocTitle={setDocTitle}
						setPodId={setPodId}
						setEpiId={setEpiId}
						setDisplay={setDisplay}
					/>
				);
				break;
			case "searchPods":
				setRender(
					<PodSearch
						userId={userId}
						setDocTitle={setDocTitle}
						setPodId={setPodId}
						setDisplay={setDisplay}
					/>
				);
				break;
			case "updatePod":
				setRender(<UpdatePod setDocTitle={setDocTitle} />);
				break;
			case "deletePod":
				setRender(<DeletePod setDocTitle={setDocTitle} />);
				break;
			case "deleteEpi":
				setRender(<DeleteEpi setDocTitle={setDocTitle} />);
				break;
			case "submitPod":
				setRender(<ImportedPod setDocTitle={setDocTitle} />);
				break;
			case "welcome":
				setRender(<Welcome setDocTitle={setDocTitle} />);
				break;
			case "":
				setRender(<p>Please wait, loading your user profile.</p>);
				break;
			default:
				setRender(<p>Please wait, loading your user profile.</p>);
		}
	}, [display, epiId, podId, userId, props]);

	// logic for telling the app to re-render the display
	const handleClick = (e) => {
		if (e.target.id) {
			if (e.target.id === "-1") {
				setDisplay("allPods");
			} else if (e.target.id === "-2") {
				setDisplay("allEpis");
			} else if (e.target.id === "-3") {
				setDisplay("searchPods");
			} else if (e.target.id === "-4") {
				setDisplay("submitPod");
			} else if (e.target.id === "-6") {
				setDisplay("deletePod");
			} else if (e.target.id === "-7") {
				setDisplay("deleteEpi");
			} else if (e.target.id === "-8") {
				setDisplay("updatePod");
			} else if (display === "allPods") {
				setPodId(e.target.id);
				setDisplay("onePod");
			} else if (display === "onePod") {
				setEpiId(e.target.id);
				setDisplay("oneEpi");
			} else if (display === "allEpis") {
				setEpiId(e.target.id);
				setPodId(e.target.value);
				setDisplay("oneEpi");
			} else if (display === "oneEpi") {
				setEpiId(0);
				setPodId(e.target.id);
				setDisplay("onePod");
			}
		}
	};

	return (
		<>
			<div onClick={handleClick}>
				<NavBar />
				{render}
			</div>
		</>
	);
}

export default MainUi;
