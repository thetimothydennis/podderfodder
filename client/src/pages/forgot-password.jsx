import React from 'react';

export function ForgotPassword () {
    return (
        <div className="Epi">
            <h1>Forgot Password</h1>
            <form className="container" method="POST" action="/api/forgotpassword">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassword">newpassword
                    <input className="col form-control" type="text" name="newpassword" id="newpassword" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Send reset link</button>
            </form>
        </div>
    );
};

export function ResetPassword () {
    return (
        <div className="Epi">
            <h1>Reset Password</h1>
            <form className="container" method="POST" action="/api/resetpassword">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassword">new password
                    <input className="col form-control" type="text" name="newpassword" id="newpassword" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassmatch">new password again
                    <input className="col form-control" type="text" name="newpassmatch" id="newpassmatch" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Reset password</button>
            </form>
        </div>
    );
};