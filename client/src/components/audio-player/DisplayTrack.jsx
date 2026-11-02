import { string, func, any, shape, oneOfType } from "prop-types";
import { useEffect } from "react";

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
        podId,
        duration
    } = props;

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    }

    let metadata = {
        title: title,
        artist: showTitle,
        album: author,
        duration: duration,
    }

    useEffect(() => {
        if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;

        navigator.mediaSession.metadata = new MediaMetadata({
        title: metadata.title,
        artist: metadata.artist ?? '',
        album: metadata.album ?? '',
        // artwork: metadata.artwork ?? [],
        });

        navigator.mediaSession.setActionHandler('play', () => {audioRef.current.play()});
        navigator.mediaSession.setActionHandler('pause', () => {audioRef.current.pause()});
        navigator.mediaSession.setActionHandler('seekforward', () => {audioRef.current.currentTime += 30})
        navigator.mediaSession.setActionHandler('seekbackward', () => {audioRef.current.currentTime -= 15})
        navigator.mediaSession.setActionHandler('seekto', (d) => {
            if (d.seekTime != null) {
                seek(d.seekTime)
                audioRef.current.currentTime = d.seekTime
            };
        });
        
        // Optional: Update position state for progress bars
        navigator.mediaSession.setPositionState?.({ 
          duration, 
          playbackRate: 1, 
          position: audioRef.current.currentTime
        });

        return () => {
        // Cleanup handlers on unmount if necessary
        };
    }, [metadata]);

    return (
        <div>
            <audio 
                src={epi} 
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata} 
                />
            <div className="audio-info">
                <div className="text">
                    <h3 className="title">{title}</h3>
                    <h4 className="allEpiDuration">{formatDate(date)}</h4>
                    <h4 className="oneEpiShowTitle" id={podId}>{showTitle}</h4>
                    <h4 className="allEpiAuthor">{author}</h4>
                    <img className="audio-image"
                        src={image} 
                        alt="audio avatar"
                        width="275px" />
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