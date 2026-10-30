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
                    appearance: "none",
                    background: `linear-gradient(to right, #f50 ${volume}%, #3d3d3d ${volume}%)`,
                    height: "6px"
            }} />
    )
}

VolumeSlider.propTypes = {
    setVolume: func,
    volume: number
}

export default VolumeSlider;