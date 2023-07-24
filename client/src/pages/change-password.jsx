import React from 'react';

export function ChangePassword () {
    return (
        <div className="Epi">
            <h1>Change Password</h1>
            <form method="POST" action="/api/changepassword">
                <p>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" id="username" />
                </p>
                <p>
                    <label htmlFor="oldpassword">old password</label>
                    <input type="password" name="oldpassword" id="oldpassword" />
                </p>
                <p>
                    <label htmlFor="newpassword">new password</label>
                    <input type="password" name="newpassword" id="newpassword" />
                </p>
                <p>
                    <label htmlFor="newpassmatch">new password match</label>
                    <input type="password" name="newpassmatch" id="newpassmatch" />
                </p>
                <button type="submit" className="btn btn-dark">Change password</button>
            </form>
        </div>
    );
};