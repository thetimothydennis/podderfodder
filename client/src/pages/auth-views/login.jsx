import { useState, useEffect } from 'react';

export function UserLogin () {
    const [gitSrc, setGitSrc] = useState('/buttons/github_normal.png');
    const [googSrc, setGoogSrc] = useState('/buttons/google_normal.png');

    useEffect(() => {
        document.title = 'Login - Podder Fodder';
    }, [])

    const handleGHClick = () => {
        setGitSrc('/buttons/github_pressed.png');
    };

    const handleGHReset = () => {
        setGitSrc('/buttons/github_normal.png');
    };

    const handleGoogClick = () => {
        setGoogSrc('/buttons/google_pressed.png');
    };

    const handleGoogReset = () => {
        setGoogSrc('/buttons/google_normal.png');
    };

    return (
        <div className="Epi">
            <h1>Podder Fodder Login</h1>
            <p>You must log in before accessing the platform.</p>
            <form className="container" method="POST" action="/api/login">
                <p className="row form-group">
                    <label className="col-sm form-control" 
                           htmlFor="username">username
                    <input className="col-sm form-control" 
                           type="text" 
                           name="username" 
                           id="username" /></label>
                </p>
                <p className="row form-group">
                    <label className="col-sm form-control" 
                           htmlFor="password">password
                    <input className="col-sm form-control" 
                           type="password" 
                           name="password" 
                           id="password" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Login</button>
                <p>Don&apos;t have an account yet? Create one <a href="/register">here</a>.</p>
                <p>Forgot your password? Click <a href="/forgotpassword">here</a>.</p>
                <p>Or, you can login with one of these social providers:</p>
                <div className="row">
                    <a className="col-sm" 
                       href="/github" 
                       style={{"pointerEvents": "all"}} 
                       onPointerEnter={handleGHClick} 
                       onPointerDown={handleGHClick} 
                       onGotPointerCapture={handleGHClick}
                       onPointerOver={handleGHClick}
                       onClick={handleGHClick}
                       onLostPointerCapture={handleGHReset}
                       onPointerOut={handleGHReset}
                       onPointerLeave={handleGHReset} 
                       onPointerCancel={handleGHReset}
                       onPointerUp={handleGHReset} >
                        <img id="github" 
                             height="45px" 
                             alt="login with github" 
                             src={gitSrc} />
                    </a>
                    <a className="col-sm" 
                       href="/google" 
                       style={{"pointerEvents": "all"}} 
                       onPointerEnter={handleGoogClick} 
                       onPointerDown={handleGoogClick} 
                       onGotPointerCapture={handleGoogClick}
                       onPointerOver={handleGoogClick}
                       onClick={handleGoogClick}
                       onLostPointerCapture={handleGoogReset}
                       onPointerOut={handleGoogReset}
                       onPointerLeave={handleGoogReset} 
                       onPointerCancel={handleGoogReset}
                       onPointerUp={handleGoogReset} >
                        <img id="google" 
                             height="45px" 
                             alt="login with google" 
                             src={googSrc} />
                    </a>
                </div>
                <p className="note">NOTE: If you&apos;ve already used a Google email address to sign up, you will not be able to sign in with Google using that account.</p>
            </form>

        </div>
    );
}