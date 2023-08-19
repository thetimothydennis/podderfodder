import React, { useState, useEffect, useRef, useCallback } from "react";
import { func, number, shape, oneOfType, any } from "prop-types";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { 
    IoPlayBackSharp,
    IoPlayForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from "react-icons/io5";

// eslint-disable-next-line max-lines-per-function
function Controls(props) {
    const { audioRef, progressBarRef, duration, setTimeProgress } = props;
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(60);
    const [muteVolume, setMuteVolume] = useState(false);
    const playAnimationRef = useRef();


    const repeat = useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(progressBarRef.current.value / duration) * 100}%`
        )

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]) 
    

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev)
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat])

    const skipForward = () => {
        audioRef.current.currentTime += 30;
    }

    const skipBackward = () => {
        audioRef.current.currentTime -= 15;
    }

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume])

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <button onClick={skipBackward}>
                    <IoPlayBackSharp className="controlBtn" />
                </button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <IoPauseSharp className="controlBtn"/> 
                                : <IoPlaySharp className="controlBtn"/>}
                </button>
                <button onClick={skipForward}>
                    <IoPlayForwardSharp className="controlBtn"/>
                </button>
            </div>
            <div>
                <button
                    onClick={() => setMuteVolume((prev) => !prev)}
                   >
                    {muteVolume || volume < 5 ? (
                        <IoMdVolumeOff className="controlBtn"/>
                    ) : volume < 40 ? (
                        <IoMdVolumeLow className="controlBtn"/>
                    ) : (
                        <IoMdVolumeHigh className="controlBtn"/>
                    )}
                </button>
                <input 
                    type="range" 
                    min={0} 
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="volume"
                    style={{
                        background: `linear-gradient(to right, #f50 ${volume}%, #3d3d3d ${volume}%)`
                    }} />
            </div>
        </div>
    )
};

Controls.propTypes = {
    setTimeProgress: func,
    audioRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    progressBarRef: oneOfType([
        func,
        shape({ current: any})
    ]),
    duration: number
}

export default Controls;