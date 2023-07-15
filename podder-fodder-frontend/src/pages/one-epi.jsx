import React, { useState, useEffect } from 'react';
// import { useAuth0 } from '@auth0/auth0-react';
// import '../Epi.css';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';

function OneEpi (props) {
    // const { user, getAccessTokenSilently } = useAuth0();
    
    const [showTitle, setShowTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [audio, setAudio] = useState('');
    const [content, setContent] = useState('');
    const [podId, setPodId] = useState("");
    const [userId, setUserId] = useState("");
    // const [accessToken, setAccessToken] = useState("");
    const user = {
        name: "Timothy Dennis",
        email: "timothyddennis@gmail.com"
    }

    async function insertUser() {
        // let res = await axios.post(
        //     `https://timothyddennis.com:9000/api/user`, 
        //     { 
        //         user: {
        //             name: user.name, 
        //             email: user.email
        //         } 
        //     }
        // );
        // setUserId(res.data.user_id);
        let res = await axios.post(
            `http://localhost:9000/api/user`, {name: user.name, email: user.email}
        );
        console.log(res.data[0])
        setUserId(res.data[0].user_id);
    };

    const getEpisode = async () => {
        let res = await axios.get(
            `http://localhost:9000/api/user/${userId}/${props.epiId}`,/*  
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            } */
        );
        setShowTitle(res.data[0].podcasts.show_title);
        setAuthor(res.data[0].podcasts.author);
        setImage(res.data[0].podcasts.image);
        setTitle(res.data[0].podcasts.episodes.title);
        setDate(res.data[0].podcasts.episodes.pubDate);
        setAudio(res.data[0].podcasts.episodes.epi_url);
        setContent(res.data[0].podcasts.episodes.content);
        setPodId(res.data[0].podcasts.pod_id);
    };

    // function getToken () {
    //     getAccessTokenSilently().then(
    //         res => {
    //             setAccessToken(res);
    //         }
    //     );
    // };

    useEffect(() => {
        // getToken();
        insertUser();
    }, []);

    useEffect(() => {
        getEpisode();
    }, [getEpisode, userId, insertUser]);

    return (
        <div className="Epi">
            <div>
                <h1 id={podId}>{showTitle}</h1>
                <h2>{title}</h2>
                <h4>{new Date(date).toString().slice(0, 15)}</h4>
                <h3>{author}</h3>
                <img className="epiImg" 
                            alt="podcast_image" 
                            src={image}
                            width="500"
                />
                <br />
                <ReactAudioPlayer src={audio} controls />
                <p>{content}</p>
            </div>
        </div>
    );
};

export default OneEpi;
