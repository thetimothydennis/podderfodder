export function UserLogin () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Login</h1>
            <p>You must log in before accessing the platform.</p>
            <form className="container" method="POST" action="/api/login">
                <p className="row form-group">
                    <label className="col-sm form-control" htmlFor="username">username
                    <input className="col-sm form-control" type="text" name="username" id="username" /></label>
                </p>
                <p className="row form-group">
                    <label className="col-sm form-control" htmlFor="password">password
                    <input className="col-sm form-control" type="password" name="password" id="password" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Login</button>
                <p>Or, you can login with one of these social providers:</p>
                <div className="row">
                    <a className="col-sm" href="/github"><img height="45px" alt="login with github" src="/buttons/github_normal.png" /></a>
                    <a className="col-sm" href="/google"><img height="45px" alt="login with google" src="/buttons/google_normal.png" /></a>
                </div>
            </form>
            <p>Don&apos;t have an account yet? Create one <a href="/register">here</a>.</p>
            <p>Forgot your password? Click <a href="/forgotpassword">here</a>.</p>
        </div>
    );
}