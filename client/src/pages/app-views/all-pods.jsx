import React, { useState, useEffect, useCallback } from "react";
import { func, string } from "prop-types";
import axios from "axios";
import { apiCall } from "../../functions/api-call.jsx";
import ShowImage from "../../components/mapped-data/all-pods/show-image";
import ShowTitle from "../../components/mapped-data/all-pods/show-title.jsx";
import Author from "../../components/mapped-data/all-pods/author";
import Description from "../../components/mapped-data/all-pods/description";
import { toast } from "react-toastify";
import { updateToast } from "../../functions/update-toast.jsx";

function AllPods({ setDocTitle, setPodId, userId }) {
  const [podcasts, setPodcasts] = useState([]);

  const getPods = useCallback(async () => {
    let toastID = toast.loading("Loading data", {
      className: "toastMessage"
    })
    axios.get(`${apiCall}/api/user/${userId}/`)
      .then((res) => {
        setPodcasts(res.data)
      }).then(() => {
        updateToast(toastID, "Podcasts loaded")
      })
  }, [userId]);

  useEffect(() => {
    getPods();
  }, [getPods]);

  useEffect(() => {
    setDocTitle("All Podcasts - Podder Fodder");
  });

  async function handlePodClick(e) {
    setPodId(e.target.id);
  }

  return (
      <div className="Epi">
        <h3>All Podcasts</h3>
        <div className="container">
          {podcasts.map((item, x) => (
            <div className="row epiRow" key={x} id={item.podcasts._id}>
              <ShowImage {...{item, handlePodClick}} />
              <ShowTitle {...{item, handlePodClick}} />
              <Author {...{item, handlePodClick}} />
              <Description {...{item, handlePodClick}} />
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
