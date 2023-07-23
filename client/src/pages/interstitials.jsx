import React from 'react';

export function UpdatePod () {
    return (
        <div className="Epi">
            <p>Podcast updated!</p>
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
            <p>Podcast submitted</p>
        </div>
    );
};

export function Welcome () {
    return (
        <div>
            <h1>Podder Fodder</h1>
            <p>Welcome to PodderFodder. Use the links above to navigate</p>
        </div>
    );
};