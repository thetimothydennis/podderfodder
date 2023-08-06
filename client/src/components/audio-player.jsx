import { useMediaSession } from '@mebtte/react-media-session';

function Player (props) {

    const { title, author, showTitle, artwork, audio } = props;

    console.log(artwork)

    return (
        useMediaSession({

            title: {title},
            artist: {author},
            album: {showTitle},
            artwork: [
                artwork
            ],
            onPlay: audio.play,
            onPause: audio.pause
        })
        
    )
}

export default Player