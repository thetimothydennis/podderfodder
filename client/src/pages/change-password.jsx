import React from 'react';

export function ChangePassword () {
    return (
        <div className="Epi">
            <h1>Change Password</h1>
            <form className="container" method="POST" action="/api/changepassword">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="username">username
                    <input className="col form-control" type="text" name="username" id="username" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="oldpassword">old password
                    <input className="col form-control" type="password" name="oldpassword" id="oldpassword" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassword">new password
                    <input className="col form-control" type="password" name="newpassword" id="newpassword" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassmatch">new password match
                    <input className="col form-control" type="password" name="newpassmatch" id="newpassmatch" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Change password</button>
            </form>
        </div>
    );
};