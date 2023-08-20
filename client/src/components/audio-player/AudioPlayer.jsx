import React, { useRef, useState } from "react";
import { string } from "prop-types";
import "../../stylesheets/customize-progress-bar.module.css";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

function AudioPlayer(props) {
    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef();
    const progressBarRef = useRef();

    return (
        <div className="audio-player">
            <div className="inner">
                <DisplayTrack 
                    {...props}
                    {...{audioRef, setDuration, progressBarRef}}/>
                <ProgressBar {...{
                    progressBarRef, 
                    audioRef, 
                    timeProgress, 
                    duration
                }} />
                <Controls 
                {...{audioRef, progressBarRef, duration, setTimeProgress}}
                 />

            </div>
            <div className="oneEpiContent">
                <br />
                <p>{props.content}</p>
            </div>
        </div>
    )
};

AudioPlayer.propTypes = {
    content: string
}

export default AudioPlayer;