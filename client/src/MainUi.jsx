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
function MainUi() {
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
    switch (display) {
      case "allPods":
        setRender(<AllPods {...{userId, setDocTitle, setPodId, setDisplay}} />);
        break;
      case "onePod":
        setRender(<OnePod {...{userId, setDocTitle, setPodId, podId, setDisplay}} />);
        break;
      case "oneEpi":
        setRender(<OneEpi {...{userId, setDocTitle, podId, epiId, setPodId}} />);
        break;
      case "allEpis":
        setRender(<AllEpis {...{userId, setDocTitle, setPodId, setEpiId, setDisplay}} />);
        break;
      case "searchPods":
        setRender(<PodSearch {...{userId, setDocTitle, setPodId, setDisplay}} />);
        break;
      case "updatePod":
        setRender(<UpdatePod {...{setDocTitle}} />);
        break;
      case "deletePod":
        setRender(<DeletePod {...{setDocTitle}} />);
        break;
      case "deleteEpi":
        setRender(<DeleteEpi {...{setDocTitle}} />);
        break;
      case "submitPod":
        setRender(<ImportedPod {...{setDocTitle}} />);
        break;
      case "welcome":
        setRender(<Welcome {...{setDocTitle}} />);
        break;
      default:
        setRender(<Welcome {...{setDocTitle}} />);
      break;
    }
  }, [display, epiId, podId, userId]);

  // logic for telling the app which display to re-render
  const handleClick = (e) => {
    if (e.target.id) {
      switch (e.target.id) {
        case "-1":
          setDisplay("allPods");
          break;
        case "-2":
          setDisplay("allEpis");
          break;
        case "-3":
          setDisplay("searchPods");
          break;
        case "-4":
          setDisplay("submitPod");
          break;
        case "-6":
          setDisplay("deletePod");
          break;
        case "-7":
          setDisplay("deleteEpi");
          break;
        case "-8":
          setDisplay("updatePod");
          break;
        default:
          if (display === "allPods") {
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
          break;
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
