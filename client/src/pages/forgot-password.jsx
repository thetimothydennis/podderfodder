import { useParams } from 'react-router';

export function ForgotPassword () {
    return (
        <div className="Epi">
            <h1>Forgot Password</h1>
            <form className="container" method="POST" action="/api/forgotpassword">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="email">email
                    <input className="col form-control" type="text" name="email" id="email" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Send reset link</button>
            </form>
        </div>
    );
}

export function ResetPassword () {
    const { token } = useParams();
    console.log(token)
    return (
        <div className="Epi">
            <h1>Reset Password</h1>
            <form className="container" method="POST" action={`/api/resetpassword/${token}`}>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassword">new password
                    <input className="col form-control" type="password" name="newpassword" id="newpassword" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="newpassmatch">new password again
                    <input className="col form-control" type="password" name="newpassmatch" id="newpassmatch" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Reset password</button>
            </form>
        </div>
    );
}