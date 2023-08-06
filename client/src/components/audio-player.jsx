import MediaSession from '@mebtte/react-media-session';

function Player (props) {

    const { title, author, showTitle, image, audio } = props;

    return (
        <MediaSession
            title={title}
            artist={author}
            album={showTitle}
            artwork={[
                {
                    src: {image}
                }
            ]}
            onPlay={audio.play}
            onPause={audio.pause}
        />
    )
}

export default Player