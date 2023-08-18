import React from "react";
import { string, func } from "prop-types";
import AudioMetadata from "../../../functions/media-session.jsx";
import AudioPlayer from "../../audio-player/AudioPlayer.jsx";

function FullLayout(props) {
  const {
    title,
    date,
    showTitle,
    author,
    image,
    epi,
    content,
    formatDate,
    podId
  } = props;
  return (
    <div className="Epi">
      <div className="oneEpi">
        <AudioMetadata
          podTitle={showTitle}
          epiTitle={title}
          author={author}
          audio={epi}
        />
        <AudioPlayer 
          podTitle={showTitle}
          epiTitle={title}
          author={author}
          audio={epi}
          image={image}
          content={content}
          date={date}
          formatDate={formatDate}
          podId={podId} />
      </div>
    </div>
  );
}

FullLayout.propTypes = {
  title: string,
  date: string,
  podId: string,
  showTitle: string,
  author: string,
  image: string,
  epi: string,
  content: string,
  formatDate: func,
};

export default FullLayout;
