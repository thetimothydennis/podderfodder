import React from "react";
import { func, number } from "prop-types";

function VolumeSlider ({ volume, setVolume }) {
    return (
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
    )
}

VolumeSlider.propTypes = {
    setVolume: func,
    volume: number
}

export default VolumeSlider;