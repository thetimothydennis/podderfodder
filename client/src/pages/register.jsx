import React from 'react';

export function UserRegister () {
    return (
        <div className="Epi">
            <form method="POST" action="/api/register">
                <label htmlFor="username">username</label>
                <input type="text" name="username" id="username" />
                <label htmlFor="password">password</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};