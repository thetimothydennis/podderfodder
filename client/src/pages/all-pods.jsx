import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function AllPods(props) {
    const [podcasts, setPodcasts] = useState([]);
    const [podId, setPodId] = useState("");

    async function getPods() {
        let res = await axios.get(
            `${apiCall}/api/user/${props.userId}/`
        );
        setPodcasts(res.data[0].podcasts);
    };

    useEffect(() => {
        getPods();
    }, []);

    async function handleDeleteClick(e) {
        await axios.delete(
            `${apiCall}/api/user/${props.userId}/${e.target.value}`
        );
    };

    async function handlePodClick(e) {
        setPodId(e.target.id);
    };

        return (
            <div className="Epi">
                <h1>
                    All Podcasts
                </h1>
                <div className="container">
                    {podcasts.map((item, x) => (
                            <div className="row epiRow" 
                                key={x}
                                id={item._id}
                            >
                            <div className="col" onClick={handlePodClick} 
                            id={item._id} 
                            >
                                <img alt="podcast_show_image"
                                width='150' 
                                src={item.image} 
                            />
                            </div>
                            <div className="col" onClick={handlePodClick} 
                                id={item._id} 
                            >
                                {item.show_title}
                            </div >
                            <div className="col" onClick={handlePodClick} 
                                id={item._id}
                            >
                                {item.author}
                            </div>
                            <div className="col" onClick={handlePodClick} 
                                id={item._id}
                            >
                                {item.description.slice(0, 250)}
                            </div>
                            <div className="col" id={item._id} 
                                onClick={handleDeleteClick}
                            >
                                <button id='-6'
                                        type="button"
                                        className="btn btn-dark"
                                        value={item._id} 
                                        onClick={handleDeleteClick}
                                >
                                    Delete podcast
                                </button>
                            </div>
                        </div>
                        ))}
            </div>
        </div>
    );
};

export default AllPods;
