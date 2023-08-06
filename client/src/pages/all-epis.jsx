import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { apiCall } from '../functions/api-call.jsx';

function AllEpis (props) {
    const [episodes, setEpisodes] = useState([]);

    const getAllEpis = useCallback(async () => {
        let res = await axios.get(
            `${apiCall}/api/allepisodes/${props.userId}`
        );
        setEpisodes(res.data);
    }, [props.userId])

    useEffect(() => {
        props.setDocTitle('All Episodes - Podder Fodder')
    }, [props]);

    useEffect(() => {
        getAllEpis();
    }, [getAllEpis]);

    const handleClick = (e) => {
        props.setPodId(e.target.value);
        props.setEpiId(e.target.id);
    };

    return (
        <div className="Epi">
            <h1>
                All Episodes
            </h1>
        
            <div className="container">
                {episodes.map((item, x) => (
                    <div className="row epiRow" 
                        onClick={handleClick} 
                        key={x} 
                        id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                    >
                        <div className="col-sm" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            <b>{item.podcasts.episodes.title}</b>
                        </div>
                        <div className="col-sm allEpiAuthor" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.show_title}
                        </div>
                        <div className="col-sm allEpiAuthor" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            { item.podcasts.author.slice(0, 25) }
                        </div>
                        <div className="col-sm allEpiDuration" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.duration} min.
                        </div>
                        <div className="col-sm" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.content.slice(0, 100)}
                        </div>
                        <div className="col-sm allEpiDuration" id={`${item.podcasts.pod_id}/${item.podcasts.episodes.epi_id}`}
                            value={item.podcasts.pod_id}>
                            {item.podcasts.episodes.pubDate.toString().slice(0, 10)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

AllEpis.propTypes = {
    userId: PropTypes.string,
    setPodId: PropTypes.func,
    setEpiId: PropTypes.func,
    setDocTitle: PropTypes.func
}

export default AllEpis;
