import React from "react";
import { func, bool } from "prop-types";
import { IoPauseSharp, IoPlaySharp } from "react-icons/io5";

function PlayPause ({ togglePlayPause, isPlaying }) {
    return (
        <button className="btn btn-dark" onClick={togglePlayPause}>
            {isPlaying ? <IoPauseSharp className="controlBtn"/> 
                        : <IoPlaySharp className="controlBtn"/>}
        </button>
    )
}

PlayPause.propTypes = {
    togglePlayPause: func,
    isPlaying: bool
}

export default PlayPause;