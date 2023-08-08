import MediaSession from '@mebtte/react-media-session';

function AudioMetadata (props) {
    const { podTitle, epiTitle, author, audio } = props;
    return (
        <MediaSession 
            title={epiTitle}
            artist={podTitle}
            album={author}
            onPlay={audio.play}
            onPause={audio.pause}
        />
    )
}

export default AudioMetadata;