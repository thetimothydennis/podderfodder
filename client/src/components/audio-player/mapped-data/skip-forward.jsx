import React from "react";
import { IoPlayForwardSharp } from "react-icons/io5";
import { func } from "prop-types";

function SkipForward ({ skipForward }) {

    return (
        <button className="btn btn-dark" onClick={skipForward}>
            <IoPlayForwardSharp className="controlBtn"/>
        </button>
    )
}

SkipForward.propTypes = {
    skipForward: func
}

export default SkipForward;