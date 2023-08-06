import { useEffect } from 'react';

export function UpdatePod (props) {

    useEffect(() => {
        props.setDocTitle('Updating Pod - Podder Fodder')
    }, [props]);

        return (
        <div className="Epi">
            <br />
                <p>Updating pod. You will be redirected shortly.</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

export function DeletePod (props) {

    useEffect(() => {
        props.setDocTitle('Pod Deleted - Podder Fodder')
    }, [props]);

        return (
        <div className="Epi">
            <br />
            <p>Podcast deleted</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

export function DeleteEpi (props) {

    useEffect(() => {
        props.setDocTitle('Episode Deleted - Podder Fodder')
    }, [props]);

    return (
        <div className="Epi">
            <br />
            <p>Episode deleted</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

export function ImportedPod (props) {
    
    useEffect(() => {
        props.setDocTitle('Adding Pod - Podder Fodder')
    }, [props]);

    return (
        <div className="Epi">
            <br />
            <p>Adding pod. You will be redirected momentarily.</p>
            <img src="waiting.svg" height="300em" />
        </div>
    );
}

export function Welcome (props) {

    useEffect(() => {
        props.setDocTitle('Podder Fodder')
    }, [props]);

    return (
        <div>
            <h1>Podder Fodder</h1>
            <p>Welcome to PodderFodder. Use the links above to navigate</p>
            <p>You can change your password <a href="/changepassword">here</a>.</p>
        </div>
    );
}

export function HomePage() {
    useEffect(() => {
        document.title = 'Podder Fodder'
    }, []);

    return (
        <div className={"Epi"}>
            <h1>Podder Fodder</h1>
            <p>Welcome to PodderFodder!</p>
            <p><a href="/login">Login</a> or <a href="/register">Register</a></p>
            <p>NOTE: you must have cookies and JavaScript enabled to use this site.</p>
        </div>
    );
}