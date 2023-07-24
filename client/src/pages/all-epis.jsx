import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function AllEpis (props) {
    const [episodes, setEpisodes] = useState([]);
    const [epiId, setEpiId] = useState('');
    const [podId, setPodId] = useState('');

    async function getAllEpis() {
        let res = await axios.get(
            `${apiCall}/api/allepisodes/${props.userId}`
        );
        setEpisodes(res.data);
    };

    useEffect(() => {
        getAllEpis();
    }, []);

    const handleClick = (e) => {
        setPodId(e.target.value);
        setEpiId(e.target.id);
    };

    return (
        <div className="Epi">
            <h1>
                All Episodes
            </h1>
            <div className="container">

                    <div className="row">
                        <div className="col">
                            Title
                        </div>
                        <div className="col">
                            Show
                        </div>
                        <div className="col">
                            Author
                        </div>
                        <div className="col">
                            Duration
                        </div>
                        <div className="col">
                            Description
                        </div>
                        <div className="col">
                            Date
                        </div>
                    </div>
                </div>

                {episodes.map((item, x) => (
                    <div className="row" 
                        onClick={handleClick} 
                        key={x} 
                        id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                    >
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.title}
                        </div>
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.show_title}
                        </div>
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            { item.podcasts.author.slice(0, 25) }
                        </div>
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.duration} min.
                        </div>
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.content.slice(0, 100)}
                        </div>
                        <div className="col" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.pubDate.toString().slice(0, 10)}
                        </div>
                    </div>
                    ))}

          
        </div>
    );
};

export default AllEpis;
