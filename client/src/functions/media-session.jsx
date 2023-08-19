import React from "react";
import MediaSession from "@mebtte/react-media-session";
import { string, func, oneOfType, shape, any } from "prop-types";

function AudioMetadata(props) {
  const { podTitle, epiTitle, author, audioRef } = props;

  const skipForward = () => {
      audioRef.current.currentTime += 30;
  }

  const skipBackward = () => {
      audioRef.current.currentTime -= 15;
  }

  return (
    <MediaSession
      title={epiTitle}
      artist={podTitle}
      album={author}
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
  audioRef: oneOfType([
    func,
    shape({ current: any})
]),
};

export default AudioMetadata;
