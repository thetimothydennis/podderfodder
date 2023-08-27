import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import FullLayout from "../../components/mapped-data/one-pod/one-pod-layout.jsx";
import { toast } from "react-toastify";
import { updateToast } from "../../functions/update-toast.jsx";

function OnePod({ userId, podId, setDocTitle, setPodId, setDisplay }) {
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
    let toastID = toast.loading("Updating podcast", {className: "toastMessage"})
    await axios.put(`${apiCall}/api/user/${userId}/${podId}`)
      .then((res) => {
        setPodId(res.data[0].podcasts.pod_id);
        setDisplay("onePod");
      })
      .then(() => {
        updateToast(toastID, "Podcast updated")
      })
  };

  useEffect(() => {getPodcasts()}, [getPodcasts]);

  const handleClick = async (e) => {
    await axios
      .delete(`${apiCall}/api/user/${userId}/${e.target.value}`)
      .then(() => {
        setDisplay("onePod");
      });
  };

  const handleDeletePod = async () => {
    await axios.delete(`${apiCall}/api/user/${userId}/${podId}`)
      .then(() => {
        setDisplay("allPods");
      })
  }

  return (
    <FullLayout
      {...{
        podId, 
        showTitle, 
        showAuthor, 
        showImg, 
        showDesc, 
        updatePod, 
        handleClick, 
        handleDeletePod,
        episodes}} />
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
