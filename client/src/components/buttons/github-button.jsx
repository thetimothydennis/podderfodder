import React, { useState } from "react";

function GithubButton () {
    const [gitSrc, setGitSrc] = useState("/buttons/github_normal.png");

    const handleGHClick = () => { setGitSrc("/buttons/github_pressed.png") }
	const handleGHReset = () => { setGitSrc("/buttons/github_normal.png") }

    return (
            <a
				className="col-sm"
				href="/github"
				style={{ pointerEvents: "all" }}
				onPointerEnter={handleGHClick}
				onPointerDown={handleGHClick}
				onGotPointerCapture={handleGHClick}
				onPointerOver={handleGHClick}
				onClick={handleGHClick}
				onLostPointerCapture={handleGHReset}
	    		onPointerOut={handleGHReset}
				onPointerLeave={handleGHReset}
				onPointerCancel={handleGHReset}
				onPointerUp={handleGHReset}>
				<img
					id="github"
					height="45px"
					alt="login with github"
					src={gitSrc} />
			</a>
    )
}

export default GithubButton