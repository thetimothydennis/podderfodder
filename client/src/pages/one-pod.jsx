import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

function OnePod(props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [accessToken, setAccessToken] = useState("");
    const [episodes, setEpisodes] = useState([]);
    const [showTitle, setShowTitle] = useState('');
    const [showDesc, setShowDesc] = useState('');
    const [showImg, setShowImg] = useState('');
    const [showAuthor, setShowAuthor] = useState('');
    const [userId, setUserId] = useState("");
    const [podObj, setPodObj] = useState({});
    const [podId, setPodId] = useState("");

    const apiCall = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_PORT}`

    let config = { 
        headers: { 
            Authorization: `Bearer ${accessToken}` 
        } 
    };

    async function insertUser() {
        let res = await axios.post(
            `${apiCall}/api/user`,
            {name: user.name, email: user.email},
            config
        );
        setUserId(res.data._id);
    };

    const getPodcasts = async () => {
        let res = await axios.get(
            `${apiCall}/api/user/${userId}/${props.podId}`,
            config
        );
        let {
            show_title,
            description,
            image,
            author,
            episodes
        } = res.data[0].podcasts;
        setPodObj(res.data[0].podcasts);
        setShowTitle(show_title);
        setShowDesc(description);
        setShowImg(image);
        setEpisodes(episodes);
        setShowAuthor(author);
    };

    const updatePod = async () => {
        let res = await axios.put(
            `${apiCall}/api/user/${userId}/${props.podId}`,
            {},
            config
        );
        setEpisodes(res.data);
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
        getPodcasts();
    }, [userId, accessToken]);

    useEffect(() => {
        setPodId(episodes._id);
    }, [getPodcasts, episodes])

    const handleClick = async (e) => {
        await axios.delete(
            `${apiCall}/api/user/${userId}/${e.target.value}`,
            config
            );
    };

    return (
        <div className="Epi">
            <h1>
                {showTitle}
            </h1>
            <h2>
                {showAuthor}
            </h2>
            <img alt="podcast_image" 
                 height="250em"
                 src={showImg}
            />
            <br />
            <button id={-8} 
                    onClick={updatePod}
            >
                Update Pod Feed
            </button>
            <p>{showDesc}</p>
            <table className="episodes">
                <thead>
                    <tr className="epiRow">
                        <th>
                            Title
                        </th>
                        <th>
                            Duration
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {episodes.map((item, x) => (
                    <tr className="epiRow" 
                        key={x} 
                        value={item._id}
                    >
                        <td id={`${props.podId}/${item._id}`} >
                            {item.title}
                        </td>
                        <td id={`${props.podId}/${item._id}`}>
                            {Math.round(item.duration / 60)} min.
                        </td>
                        <td id={`${props.podId}/${item._id}`}>
                            { item.pubDate.toString().slice(0, 10) }
                        </td>
                        <td id={`${props.podId}/${item._id}`}>
                            {item.content.slice(0, 200)}...
                        </td>
                        <td>
                            <button id={-7} 
                                    value={`${props.podId}/${item._id}`} 
                                    onClick={handleClick}
                            >
                                Delete episode
                            </button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default OnePod;
