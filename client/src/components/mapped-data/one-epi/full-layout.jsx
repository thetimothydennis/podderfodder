import React from "react";
import { string, func } from "prop-types";
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
    podId,
  } = props;
  return (
    <div className="Epi">
      <div className="oneEpi">
        <AudioPlayer 
          {...{
            author, 
            epi, 
            showTitle, 
            image, 
            content, 
            date, 
            formatDate, 
            podId,
             title
          }} />
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
