import React from "react";
import { number, func, oneOfType, shape, any} from "prop-types";

function ProgressBar({ progressBarRef, audioRef, timeProgress, duration }) {

    const handleProgressBarChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    }

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const formatMinutes = minutes < 10 ?
                `0${minutes}` : `${minutes}`;
            const seconds = Math.floor(time % 60);
            const formatSeconds = seconds < 10 ?
                `0${seconds}` : `${seconds}`;
            return `${formatMinutes}:${formatSeconds}`
        }
        return "00:00";
    }

    return (
        <div className="progress">
            <span className="time current">{formatTime(timeProgress)}</span>
            <input 
                type="range" 
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressBarChange} />
            <span className="time">{formatTime(duration)}</span>
        </div>
    )
};

ProgressBar.propTypes = {
    progressBarRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    audioRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    timeProgress: number,
    duration: number
}

export default ProgressBar;