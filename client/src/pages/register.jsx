import React from 'react';

export function UserRegister () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Registration</h1>
            <form method="POST" action="/api/register">
                <p>
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" />
                </p>
                <p>
                    <label htmlFor="email">email</label>
                    <input type="text" name="email" id="email" />
                </p>
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" id="password" />
                </p>
                <p>
                    <label htmlFor="password">password</label>
                    <input type="password" name="passwordMatch" id="passwordMatch" />
                </p>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};