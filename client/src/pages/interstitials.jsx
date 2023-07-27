import React from 'react';

export function UpdatePod () {
    return (
        <div className="Epi">
            <p>Updating pod. You will be redirected shortly.</p>
        </div>
    );
};

export function DeletePod () {
    return (
        <div className="Epi">
            <p>Podcast deleted</p>
        </div>
    );
};

export function DeleteEpi () {
    return (
        <div className="Epi">
            <p>Episode deleted</p>
        </div>
    );
};

export function ImportedPod () {
    return (
        <div className="Epi">
            <p>Adding pod. You will be redirected momentarily.</p>
        </div>
    );
};

export function Welcome () {
    return (
        <div>
            <h1>Podder Fodder</h1>
            <p>Welcome to PodderFodder. Use the links above to navigate</p>
            <p>You can change your password <a href="/changepassword">here</a>.</p>
        </div>
    );
};

export function HomePage() {
    return (
        <div className={"Epi"}>
            <h1>Podder Fodder</h1>
            <p>Welcome to PodderFodder!</p>
            <p><a href="/login">Login</a> or <a href="/register">Register</a></p>
            <p>NOTE: you must have cookies and JavaScript enabled to use this site.</p>
        </div>
    );
};