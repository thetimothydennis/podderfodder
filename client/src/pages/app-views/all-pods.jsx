import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import FullLayout from "../../components/mapped-data/all-pods/full-layout.jsx";

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
    <FullLayout
      podcasts={podcasts}
      handlePodClick={handlePodClick}
      handleDeleteClick={handleDeleteClick}
    />
  );
}

AllPods.propTypes = {
  userId: string,
  setPodId: func,
  setDisplay: func,
  setDocTitle: func,
};

export default AllPods;
