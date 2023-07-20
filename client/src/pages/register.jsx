import React from 'react';

export function UserRegister () {
    return (
        <div className="Epi">
            <form method="POST" action="/api/register">
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};