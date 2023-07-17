import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function AllPods() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [podcasts, setPodcasts] = useState([]);
    const [podId, setPodId] = useState("");
    const [userId, setUserId] = useState("");
    const [accessToken, setAccessToken] = useState("")

    let config = { 
        headers: { 
            Authorization: `Bearer ${accessToken}` 
        } 
    };

    async function insertUser() {
        let res = await axios.post(
            `https://localhost:9000/api/user`,
            {name: user.name, email: user.email},
            config
        );
        setUserId(res.data[0].user_id);
    };


    async function getPods() {
        let res = await axios.get(
            `https://localhost:9000/api/user/${userId}/`,
            config
        );
        setPodcasts(res.data[0].podcasts);
    };

    function getToken () {
        getAccessTokenSilently().then(
            res => {
                setAccessToken(res);
            }
        );
    };

    useEffect(() => {
        getToken();
        insertUser();
    });

    useEffect(() => {
        getPods();
    }, [userId, accessToken]);

    async function handleDeleteClick(e) {
        await axios.delete(
            `https://localhost:9000/api/user/${userId}/${e.target.value}`,
            config
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
