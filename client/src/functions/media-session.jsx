import React from "react";
import MediaSession from "@mebtte/react-media-session";
import { string, func} from "prop-types";

function AudioMetadata(props) {
  const { podTitle, epiTitle, author, audio } = props;

  const skipForward = () => {
      audio.currentTime += 30;
  }

  const skipBackward = () => {
      audio.currentTime -= 15;
  }

  return (
    <MediaSession
      title={epiTitle}
      artist={podTitle}
      album={author}
      onPlay={audio.play}
      onPause={audio.pause}
      onSeekBackward={skipBackward}
      onSeekForward={skipForward}
    />
  );
}

AudioMetadata.propTypes = {
  podTitle: string,
  epiTitle: string,
  album: string,
  author: string,
  audio: string,
  skipBackward: func,
  skipForward: func
};

export default AudioMetadata;
