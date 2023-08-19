import React from "react";
import { useMediaSession, useMediaMeta } from "use-media-session";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { string, func, any, shape, oneOfType } from "prop-types";

// eslint-disable-next-line max-lines-per-function
function DisplayTrack(props) {
    const {
        audioRef,
        showTitle,
        title,
        image,
        epi,
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

  useMediaSession({
    onSeekBackward: () => {
      audioRef.current.currentTime -= 15;
    },
    onSeekForward: () => {
      audioRef.current.currentTime += 30;
    },
    onPlay: () => {
      audioRef.current.play();
    },
    onPause: () => {
      audioRef.current.pause();
    },
    onStop: () => {
      audioRef.current.pause();
    }
  })

  useMediaMeta({
    title: title,
    artist: showTitle,
    album: author
  })

    return (
        <div>
            <audio 
                src={epi} 
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata} />
            <div className="audio-info">
                <div className="text">
                    <h3 className="title">{title}</h3>
                    <h4 className="allEpiDuration">{formatDate(date)}</h4>
                    <h4 className="oneEpiShowTitle" id={podId}>{showTitle}</h4>
                    <h4 className="allEpiAuthor">{author}</h4>
                </div>
                <div className="audio-image">
                    {image ? (
                        <img 
                            src={image} 
                            alt="audio avatar"
                            width="275px" />   
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
    showTitle: string,
    title: string,
    image: string,
    epi: string,
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