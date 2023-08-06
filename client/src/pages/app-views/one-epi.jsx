import { useState, useEffect, useCallback } from 'react';
import { func, string } from 'prop-types';
import axios from 'axios';
import { apiCall } from '../../functions/api-call.jsx';
import Player from '../../components/audio-player.jsx';


const loadImage = (setImageDimensions, setImageExtension, setComboImgDimensions, imageDimensions, comboImgDimensions, imageExtension, setImgObj, image) => {
    const img = new Image();
    img.src = image;

    img.onload = () => {
        setImageDimensions({
            height: img.height,
            width: img.width
        })
        let imgSrcArr = img.src.split('/');
        let imgSrcName = imgSrcArr[imgSrcArr.length - 1].split("?")
        let imgExt = imgSrcName[0].split(".")[1]
        setImageExtension(`image/${imgExt}`)
        setComboImgDimensions(`${imageDimensions.height}x${imageDimensions.width}`);
        setImgObj({
            src: image,
            sizes: comboImgDimensions,
            type: imageExtension
        })
    }
}

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
    const [imageDimensions, setImageDimensions] = useState({});
    const [comboImgDimensions, setComboImgDimensions] = useState('');
    const [imageExtension, setImageExtension] = useState('');
    const [imgObj, setImgObj] = useState({ src: '/waiting.svg', sizes: '800x800', type: 'image/svg' })

    useEffect(() => {
        loadImage(setImageDimensions, setImageExtension, setComboImgDimensions, imageDimensions, comboImgDimensions, imageExtension, setImgObj, image);
    }, [image, comboImgDimensions])

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
                <Player title={title} author={author} showTitle={showTitle} artwork={imgObj} audio={epi} />
                <audio className="audioPlayer" src={epi} controls />

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