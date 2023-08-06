import MediaSession from '@mebtte/react-media-session';

function Player (props) {

    const { title, author, showTitle, artwork, audio, dimensions, type } = props;

    return (
        <MediaSession
            title={title}
            artist={author}
            album={showTitle}
            artwork={[
                {
                    src: {artwork},
                    type: {type},
                    size: {dimensions}
                }
            ]}
            onPlay={audio.play}
            onPause={audio.pause}
        />
    )
}

export default Player