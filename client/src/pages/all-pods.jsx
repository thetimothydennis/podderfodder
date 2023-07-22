import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllPods(props) {
    const [podcasts, setPodcasts] = useState([]);
    const [podId, setPodId] = useState("");
    const apiCall = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PORT}`

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
                <table className="episodes">
                    <thead>
                        <tr className="epiRow">
                            <th>
                                Artwork
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Author
                            </th>
                            <th>
                                Description
                            </th>
                            <th>
                            </th>
                        </tr>
                    </thead>
                    <tbody id={-1}>
                    {podcasts.map((item, x) => (
                            <tr className="epiRow" 
                                key={x}
                            >
                            <td onClick={handlePodClick} 
                            id={item._id} 
                            >
                                <img alt="podcast_show_image"
                                width='150' 
                                src={item.image} 
                            />
                            </td>
                            <td onClick={handlePodClick} 
                                id={item._id} 
                            >
                                {item.show_title}
                            </td >
                            <td onClick={handlePodClick} 
                                id={item._id}
                            >
                                {item.author}
                            </td>
                            <td onClick={handlePodClick} 
                                id={item._id}
                            >
                                {item.description.slice(0, 250)}
                            </td>
                            <td id={item._id} 
                                onClick={handleDeleteClick}
                            >
                                <button id='-6' 
                                        value={item._id} 
                                        onClick={handleDeleteClick}
                                >
                                    Delete podcast
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    );
};

export default AllPods;
