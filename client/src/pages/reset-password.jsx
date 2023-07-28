import React from 'react';

export function RequestPassword () {
    return (
        <div className="Epi">
            <h1>Change Password</h1>
            <form className="container" method="POST" action="/api/reset">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="email">email
                    <input className="col form-control" type="text" name="email" id="email" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Request passwordd</button>
            </form>
        </div>
    );
};