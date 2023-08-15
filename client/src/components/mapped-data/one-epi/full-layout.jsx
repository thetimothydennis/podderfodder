import React from "react";
import { string, func } from "prop-types";
import AudioMetadata from "../../../functions/media-session.jsx";

function FullLayout(props) {
  const {
    title,
    date,
    podId,
    showTitle,
    author,
    image,
    epi,
    content,
    formatDate,
  } = props;
  return (
    <div className="Epi">
      <div className="oneEpi">
        <h3>{title}</h3>
        <h4 className="allEpiDuration">{formatDate(date)}</h4>
        <h4 className="oneEpiShowTitle" id={podId}>
          {showTitle}
        </h4>
        <h4 className="allEpiAuthor">{author}</h4>
        <img
          className="epiImg"
          alt="podcast_image"
          src={image}
          height="250em"
        />
        <audio className="audioPlayer" src={epi} controls />
        <AudioMetadata
          podTitle={showTitle}
          epiTitle={title}
          author={author}
          audio={epi}
        />
        <p className="oneEpiContent">{content}</p>
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
