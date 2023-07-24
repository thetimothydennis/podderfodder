import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function OnePod(props) {
    const [episodes, setEpisodes] = useState([]);
    const [showTitle, setShowTitle] = useState('');
    const [showDesc, setShowDesc] = useState('');
    const [showImg, setShowImg] = useState('');
    const [showAuthor, setShowAuthor] = useState('');
    const [podObj, setPodObj] = useState({});
    const [podId, setPodId] = useState("");

    const getPodcasts = async () => {
        let res = await axios.get(
            `${apiCall}/api/user/${props.userId}/${props.podId}`
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
            `${apiCall}/api/user/${props.userId}/${props.podId}`
        );
        setEpisodes(res.data);
    };
    
    useEffect(() => {
        getPodcasts();
    }, []);

    useEffect(() => {
        setPodId(episodes._id);
    }, [getPodcasts, episodes])

    const handleClick = async (e) => {
        await axios.delete(
            `${apiCall}/api/user/${props.userId}/${e.target.value}`
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
            <div className="container">

                    <div className="row">
                        <div className="col">
                            Title
                        </div>
                        <div className="col">
                            Duration
                        </div>
                        <div className="col">
                            Date
                        </div>
                        <div className="col">
                            Description
                        </div>
                        <div className="col">
                        </div>
                    </div>

                {episodes.map((item, x) => (
                    <div className="row" 
                        key={x} 
                        value={item._id}
                    >
                        <div className="col" id={`${props.podId}/${item._id}`} >
                            {item.title}
                        </div>
                        <div className="col" id={`${props.podId}/${item._id}`}>
                            {item.duration} min.
                        </div>
                        <div className="col" id={`${props.podId}/${item._id}`}>
                            { item.pubDate.toString().slice(0, 10) }
                        </div>
                        <div className="col" id={`${props.podId}/${item._id}`}>
                            {item.content.slice(0, 200)}...
                        </div>
                        <div>
                            <button id={-7} 
                                    value={`${props.podId}/${item._id}`} 
                                    onClick={handleClick}
                            >
                                Delete episode
                            </button>
                        </div>
                    </div>))}

            </div>
        </div>
    );
};

export default OnePod;
