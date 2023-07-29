import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function AllPods(props) {
    const [podcasts, setPodcasts] = useState([]);

    const getPods = useCallback(async () => {
        let res = await axios.get(
            `${apiCall}/api/user/${props.userId}/`
        );
        setPodcasts(res.data[0].podcasts);
    }, [props.userId]);

    useEffect(() => {
        getPods();
    }, [getPods]);

    async function handleDeleteClick(e) {
        await axios.delete(
            `${apiCall}/api/user/${props.userId}/${e.target.value}`
        ).then(() => {
            props.setDisplay('allPods');
        });
    }

    async function handlePodClick(e) {
        props.setPodId(e.target.id);
    }

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
}

AllPods.propTypes = {
    userId: PropTypes.string,
    setPodId: PropTypes.func,
    setDisplay: PropTypes.func
}

export default AllPods;
