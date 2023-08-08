import { useState, useEffect, useCallback } from 'react';
import { func, string } from 'prop-types';
import axios from 'axios';
import { apiCall } from '../../functions/api-call.jsx';
import AudioMetadata from '../../functions/media-session.jsx';

function OneEpi (props) {

    function formatDate (date) {
        return new Date(date).toString().slice(0, 15);
    }

    const [showTitle, setShowTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('waiting.svg');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(formatDate('2004-02-01T00:00:00Z'));
    const [epi, setEpi] = useState('');
    const [content, setContent] = useState('');

    const getEpisode = useCallback(async () => {
        let res = await axios.get(
            `${apiCall}/api/user/${props.userId}/${props.epiId}`
        );
        let item = res.data[0].podcasts;
        setShowTitle(item.show_title);
        setAuthor(item.author);
        setImage(item.image);
        setTitle(item.episodes.title);
        setDate(item.episodes.pubDate);
        setEpi(item.episodes.epi_url);
        setContent(item.episodes.content);
        props.setPodId(item.pod_id);
        props.setDocTitle(`${item.episodes.title} - Podder Fodder`)
    }, [props]);

    useEffect(() => {
        getEpisode();
    }, [getEpisode]);

    return (
        <div className="Epi">
            <div className="oneEpi">
                <h1 id={props.podId}>{showTitle}</h1>
                <h2>{title}</h2>
                <h4 className="allEpiDuration">{formatDate(date)}</h4>
                <h3 className="allEpiAuthor">{author}</h3>
                <img className="epiImg" 
                            alt="podcast_image" 
                            src={image}
                            height="250em" 
                />
                <br />
                <audio className="audioPlayer" src={epi} controls />
                <AudioMetadata 
                    podTitle={showTitle}
                    epiTitle={title}
                    author={author}
                    audio={epi}
                />
                <p className="oneEpiContent">{content}</p>
            </div>
        </div>
    );
}

OneEpi.propTypes = {
    userId: string,
    epiId: string,
    setPodId: func,
    podId: string,
    setDocTitle: func
}

export default OneEpi;