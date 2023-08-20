import React, { useState, useEffect } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { apiCall } from "./functions/api-call.jsx";
import NavBar from "./pages/pod-nav-bar.jsx";
import Welcome from "./pages/welcome.jsx";
import PodSearch from "./pages/app-views/pod-search.jsx";
import AllPods from "./pages/app-views/all-pods.jsx";
import OnePod from "./pages/app-views/one-pod.jsx";
import OneEpi from "./pages/app-views/one-epi.jsx";
import AllEpis from "./pages/app-views/all-epis.jsx";
import UpdatePod from "./pages/app-views/update-pod.jsx";
import DeletePod from "./pages/app-views/delete-pod.jsx";
import DeleteEpi from "./pages/app-views/delete-epi.jsx";
import ImportedPod from "./pages/app-views/imported-pod.jsx";

// eslint-disable-next-line max-lines-per-function
function MainUi(props) {
  const [display, setDisplay] = useState("welcome");
  const [podId, setPodId] = useState("");
  const [epiId, setEpiId] = useState("");
  const [render, setRender] = useState(<Welcome />);
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

  useEffect(() => { getUserId(); });

  useEffect(() => { document.title = docTitle; }, [docTitle]);

  useEffect(() => {
    setDisplay("welcome");
    setRender(<Welcome userId={userId} />);
  }, [userId]);

  //logic that renders the new component when display is updated
  useEffect(() => {
    if (display === "allPods") {
      setRender(<AllPods {...{userId, setDocTitle, setPodId, setDisplay}} />);
    } else if (display === "onePod") {
      setRender(
        <OnePod {...{userId, setDocTitle, setPodId, podId, setDisplay}} />
      );
    } else if (display === "oneEpi") {
      setRender(<OneEpi {...{userId, setDocTitle, podId, epiId, setPodId}} />);
    } else if (display === "allEpis") {
      setRender(
        <AllEpis {...{userId, setDocTitle, setPodId, setEpiId, setDisplay}} />
      );
    } else if (display === "searchPods") {
      setRender(
        <PodSearch {...{userId, setDocTitle, setPodId, setDisplay}} />
      );
    } else if (display === "updatePod") {
      setRender(<UpdatePod {...{setDocTitle}} />);
    } else if (display === "deletePod") {
      setRender(<DeletePod {...{setDocTitle}} />);
    } else if (display === "deleteEpi") {
      setRender(<DeleteEpi {...{setDocTitle}} />);
    } else if (display === "submitPod") {
      setRender(<ImportedPod {...{setDocTitle}} />);
    } else if (display === "welcome") {
      setRender(<Welcome {...{setDocTitle}} />);
    }
  }, [display, epiId, podId, userId, props]);

  // logic for telling the app which display to re-render
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
      <div onClick={handleClick}>
        <NavBar />
        {render}
      </div>
  );
}

export default MainUi;
