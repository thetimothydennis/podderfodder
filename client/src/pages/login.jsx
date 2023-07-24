import React from 'react';

export function UserLogin () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Login</h1>
            <form method="POST" action="/api/login">
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
            <p>Don't have an account yet? Create one <a href="/register">here</a>.</p>
        </div>
    );
};