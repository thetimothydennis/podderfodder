import { number, func, oneOfType, shape, any} from "prop-types";
import styles from "../../stylesheets/customize-progress-bar.module.css";

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
        <div className={styles.container}>
            <span 
                className="time current">{formatTime(timeProgress)}  </span>
            <input 
                type="range" 
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressBarChange}
                style={{
                    background: `linear-gradient(to right, #f50 ${progressBarRef}%, #3d3d3d ${progressBarRef}%)`,
                    alignSelf:"center",
                    margin: "0.25rem",
                    maxWidth: "50vw",
                }} />
            <span className="time">  {formatTime(duration)}</span>
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