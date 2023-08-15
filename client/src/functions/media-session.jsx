import React from "react";
import MediaSession from "@mebtte/react-media-session";
import { string } from "prop-types";

function AudioMetadata(props) {
  const { podTitle, epiTitle, author, audio } = props;
  return (
    <MediaSession
      title={epiTitle}
      artist={podTitle}
      album={author}
      onPlay={audio.play}
      onPause={audio.pause}
    />
  );
}

AudioMetadata.propTypes = {
  podTitle: string,
  epiTitle: string,
  album: string,
  author: string,
  audio: string,
};

export default AudioMetadata;
