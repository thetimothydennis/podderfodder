import React, { useState, useEffect, useRef, useCallback } from "react";
import { func, number, shape, oneOfType, any } from "prop-types";
import SkipBackward from "./mapped-data/skip-backward";
import SkipForward from "./mapped-data/skip-forward";
import PlayPause from "./mapped-data/play-pause";
import MuteUnmute from "./mapped-data/mute-unmute";
import VolumeSlider from "./mapped-data/volume-slider";

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
    
    const togglePlayPause = () => setIsPlaying((prev) => !prev);

    useEffect(() => {
        if (isPlaying) { 
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat])

    const skipForward = () => audioRef.current.currentTime += 30;

    const skipBackward = () => audioRef.current.currentTime -= 15;

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volume / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volume, audioRef, muteVolume])

    return (
        <div className="controls-wrapper">
            <div className="controls">
                <SkipBackward {...{skipBackward}} />
                <PlayPause {...{isPlaying, togglePlayPause}} />
                <SkipForward {...{skipForward}} />
                <MuteUnmute {...{ muteVolume, setMuteVolume, volume }} />
                <VolumeSlider {...{volume, setVolume}} />
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