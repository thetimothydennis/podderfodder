import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function OnePod(props) {
    const [episodes, setEpisodes] = useState([]);
    const [showTitle, setShowTitle] = useState('');
    const [showDesc, setShowDesc] = useState('');
    const [showImg, setShowImg] = useState('');
    const [showAuthor, setShowAuthor] = useState('');
    
    const getPodcasts = useCallback(async () => {
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
        setShowTitle(show_title);
        setShowDesc(description);
        setShowImg(image);
        setEpisodes(episodes);
        setShowAuthor(author);
    }, [props]);

    const updatePod = async () => {
        await axios.put(
            `${apiCall}/api/user/${props.userId}/${props.podId}`
        ).then((res) => {
            console.log(res.data[0].podcasts.pod_id)
            props.setPodId(res.data[0].podcasts.pod_id);
            props.setDisplay('onePod');
        });
    };
    
    useEffect(() => {
        getPodcasts();
    }, [getPodcasts]);

    const handleClick = async (e) => {
        await axios.delete(
            `${apiCall}/api/user/${props.userId}/${e.target.value}`
        ).then(() => {
            props.setDisplay('onePod');
        });
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
                    type="button"
                    className="btn btn-dark onePodBtn">
                Update Pod Feed
            </button>
            <p>{showDesc}</p>
            <div className="container">
                {episodes.map((item, x) => (
                    <div className="row epiRow" 
                        key={x} 
                        value={item._id}
                        id={`${props.podId}/${item._id}`}>
                        <div className="col-sm" id={`${props.podId}/${item._id}`} >
                            <b>{item.title}</b>
                        </div>
                        <div className="col-sm allEpiDuration" id={`${props.podId}/${item._id}`}>
                            {item.duration} min.
                        </div>
                        <div className="col-sm allEpiDuration" id={`${props.podId}/${item._id}`}>
                            { item.pubDate.toString().slice(0, 10) }
                        </div>
                        <div className="col-sm" id={`${props.podId}/${item._id}`}>
                            {item.content.slice(0, 200)}...
                        </div>
                        <div>
                            <button id={-7} 
                                    type="button"
                                    className="btn btn-dark"
                                    value={`${props.podId}/${item._id}`} 
                                    onClick={handleClick}
                            >
                                Delete episode
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

OnePod.propTypes = {
    userId: PropTypes.string,
    podId: PropTypes.string,
    setPodId: PropTypes.func,
    setDisplay: PropTypes.func
}

export default OnePod;