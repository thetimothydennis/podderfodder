export function UserLogin () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Login</h1>
            <form className="container" method="POST" action="/api/login">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="username">username
                    <input className="col form-control" type="text" name="username" id="username" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="password">password
                    <input className="col form-control" type="password" name="password" id="password" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Login</button>
            </form>
            <p>Don&apos;t have an account yet? Create one <a href="/register">here</a>.</p>
            <p>Forgot your password? Click <a href="/forgotpassword">here</a>.</p>
        </div>
    );
}