import React from "react";
import { func } from "prop-types";
import { IoPlayBackSharp } from "react-icons/io5";

function SkipBackward ({ skipBackward }) {

    return (
        <button className="btn btn-dark" onClick={skipBackward}>
            <IoPlayBackSharp className="controlBtn" />
        </button>
    )
}

SkipBackward.propTypes = {
    skipBackward: func
}

export default SkipBackward;