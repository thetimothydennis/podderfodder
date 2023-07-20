import React from 'react';

export function UserLogin () {
    return (
        <div className="Epi">
            <form method="POST" action="/api/login">
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};