import { useParams } from 'react-router';

export function ForgotPassword () {
    return (
        <div className="Epi">
            <h1>Forgot Password</h1>
            <p>To start the password recovery process, provide the email address you used during sign-up.</p>
            <form className="container" method="POST" action="/api/forgotpassword">
                <p className="row form-group">
                    <label className="col-sm form-control" htmlFor="email">email
                    <input className="col-sm form-control" type="text" name="email" id="email" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Send reset link</button>
            </form>
            <p>After clicking submit, check your email for a link to reset your password.</p>
        </div>
    );
}

export function ResetPassword () {
    const { token } = useParams();
    console.log(token)
    return (
        <div className="Epi">
            <h1>Reset Password</h1>
            <p>Enter a new password twice to regain access to your account.</p>
            <form className="container" method="POST" action={`/api/resetpassword/${token}`}>
                <ul className="ruleList"><b>Password requirements: </b>
                    <li className="ruleItem">between 7 and 15 characters</li>
                    <li className="ruleItem">one uppercase letter</li>
                    <li className="ruleItem">one lowercase letter</li>
                    <li className="ruleItem">one numeric digit</li>
                </ul>
                <p className="row form-group">
                    <label className="col-sm form-control" htmlFor="newpassword">new password
                    <input className="col-sm form-control" type="password" name="newpassword" id="newpassword" /></label>
                </p>
                <p className="row form-group">
                    <label className="col-sm form-control" htmlFor="newpassmatch">new password again
                    <input className="col-sm form-control" type="password" name="newpassmatch" id="newpassmatch" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Reset password</button>
            </form>
            <p>If the provided passwords don&apos;t match, you will be redirected back to this page.</p>
        </div>
    );
}