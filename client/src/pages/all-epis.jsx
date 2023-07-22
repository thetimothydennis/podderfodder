import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllEpis () {
    const [episodes, setEpisodes] = useState([]);
    const [epiId, setEpiId] = useState("");
    const [userId, setUserId] = useState("");
    const [podId, setPodId] = useState("");

    const apiCall = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PORT}`

    async function getUserId() {
        let res = await axios.get(
            `${apiCall}/api/user-data`
        )
        setUserId(res.data.user_id)
    }

    async function getAllEpis() {
        let res = await axios.get(
            `${apiCall}/api/allepisodes/${userId}`
        );
        setEpisodes(res.data);
    };

    useEffect(() => {
        getUserId();
    }, []);

    useEffect(() => {
        getAllEpis();
    }, [userId]);

    const handleClick = (e) => {
        setPodId(e.target.value);
        setEpiId(e.target.id);
    };

    return (
        <div className="Epi">
            <h1>
                All Episodes
            </h1>
            <table className="episodes">
                <thead>
                    <tr className="epiRow">
                        <th>
                            Title
                        </th>
                        <th>
                            Show
                        </th>
                        <th>
                            Author
                        </th>
                        <th>
                            Duration
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Date
                        </th>
                    </tr>
                </thead>
                <tbody>
                {episodes.map((item, x) => (
                    <tr className="epiRow" 
                        onClick={handleClick} 
                        key={x} 
                        id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                    >
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.title}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.show_title}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            { item.podcasts.author.slice(0, 25) }
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {Math.round(item.podcasts.episodes.duration / 60)} min.
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.content.slice(0, 100)}
                        </td>
                        <td id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.pubDate.toString().slice(0, 10)}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllEpis;
