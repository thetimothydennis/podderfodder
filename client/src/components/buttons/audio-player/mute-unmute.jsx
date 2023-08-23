import React from "react";
import { func, number, bool } from "prop-types";
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";

function MuteUnmute ({ muteVolume, setMuteVolume, volume }) {
    return (
        <button
            onClick={() => setMuteVolume((prev) => !prev)}
            className="btn btn-dark"
        >
            {muteVolume || volume < 5 ? (
                <IoMdVolumeOff className="controlBtn"/>
            ) : volume < 40 ? (
                <IoMdVolumeLow className="controlBtn"/>
            ) : (
                <IoMdVolumeHigh className="controlBtn"/>
            )}
        </button>
    )
}

MuteUnmute.propTypes = {
    setMuteVolume: func,
    volume: number,
    muteVolume: bool
}

export default MuteUnmute;