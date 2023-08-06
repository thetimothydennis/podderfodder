import { useMediaSession } from '@mebtte/react-media-session';
import { useEffect, useState } from 'react'

function Player (props) {
    const { title, author, showTitle, artwork, audio } = props;
    const [render, setRender] = useState({})

    useEffect(() => {
        ({
            title: title,
            artist: author,
            album: showTitle,
            artwork: [
                artwork
            ],
            onPlay: audio.play,
            onPause: audio.pause
        })
    },[artwork])

    console.log(artwork)

    return (
        useMediaSession(render)
    )
}

export default Player