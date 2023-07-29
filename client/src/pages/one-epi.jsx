import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ReactAudioPlayer from 'react-audio-player';
import { apiCall } from '../functions/api-call.jsx';

function OneEpi (props) {
    const [showTitle, setShowTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [audio, setAudio] = useState('');
    const [content, setContent] = useState('');

    const getEpisode = async () => {
        let res = await axios.get(
            `${apiCall}/api/user/${props.userId}/${props.epiId}`
        );
        setShowTitle(res.data[0].podcasts.show_title);
        setAuthor(res.data[0].podcasts.author);
        setImage(res.data[0].podcasts.image);
        setTitle(res.data[0].podcasts.episodes.title);
        setDate(res.data[0].podcasts.episodes.pubDate);
        setAudio(res.data[0].podcasts.episodes.epi_url);
        setContent(res.data[0].podcasts.episodes.content);
        props.setPodId(res.data[0].podcasts.pod_id);
    };

    useEffect(() => {
        getEpisode();
    });

    return (
        <div className="Epi">
            <div>
                <h1 id={props.podId}>{showTitle}</h1>
                <h2>{title}</h2>
                <h4>{new Date(date).toString().slice(0, 15)}</h4>
                <h3>{author}</h3>
                <img className="epiImg" 
                            alt="podcast_image" 
                            src={image}
                            height="250em"
                />
                <br />
                <ReactAudioPlayer src={audio} controls />
                <p>{content}</p>
            </div>
        </div>
    );
}

OneEpi.propTypes = {
    userId: PropTypes.string,
    epiId: PropTypes.string,
    setPodId: PropTypes.func,
    podId: PropTypes.string
}

export default OneEpi;