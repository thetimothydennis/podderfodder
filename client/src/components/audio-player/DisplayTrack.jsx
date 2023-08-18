import React from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { string, func, any, shape, oneOfType } from "prop-types";

function DisplayTrack(props) {
    const {
        audioRef,
        podTitle,
        epiTitle,
        image,
        audio,
        setDuration,
        progressBarRef,
        date,
        author,
        formatDate,
        podId
    } = props;

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    return (
        <div>
            <audio 
                src={audio} 
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata} />
            <div className="audio-info">
                <div className="text">
                    <h3 className="title">{epiTitle}</h3>
                    <h4 className="allEpiDuration">{formatDate(date)}</h4>
                    <h4 className="oneEpiShowTitle" id={podId}>{podTitle}</h4>
                    <h4 className="allEpiAuthor">{author}</h4>
                </div>
                <div className="audio-image">
                    {image ? (
                        <img 
                            src={image} 
                            alt="audio avatar"
                            height="300px" />   
                    ) : (
                        <div className="icon-wrapper">
                            <span className="audio-icon">
                                <BsMusicNoteBeamed />
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};

DisplayTrack.propTypes = {
    audioRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    podTitle: string,
    epiTitle: string,
    image: string,
    audio: string,
    setDuration: func,
    progressBarRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    date: string,
    author: string,
    content: string,
    formatDate: func,
    podId: string
}

export default DisplayTrack;