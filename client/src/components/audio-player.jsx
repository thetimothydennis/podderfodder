import MediaSession from '@mebtte/react-media-session';
import { useState, useEffect } from 'react';

function Player (props) {
    const { title, author, showTitle, artwork, audio } = props;
    const [ podart, setPodart ] = useState({src: 'waiting.svg' });

    useEffect(() => {
        setPodart(artwork)
        console.log(artwork)
    }, [artwork])

    return (
        <MediaSession
            title={title}
            artist={author}
            album={showTitle}
            artwork={[
                {src: podart}
            ]}
            onPlay={audio.play}
            onPause={audio.pause}
        />
    )
}

export default Player