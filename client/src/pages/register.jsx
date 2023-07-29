export function UserRegister () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Registration</h1>
            <form className="container" method="POST" action="/api/register">
                <p className="row form-group">
                    <label className="col form-control" htmlFor="name">name
                    <input className="col form-control" type="text" name="name" id="name" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="email">email
                    <input className="col form-control" type="text" name="email" id="email" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="username">username
                    <input className="col form-control" type="text" name="username" id="username" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="password">password
                    <input className="col form-control" type="password" name="password" id="password" /></label>
                </p>
                <p className="row form-group">
                    <label className="col form-control" htmlFor="password">re-enter password
                    <input className="col form-control" type="password" name="passwordMatch" id="passwordMatch" /></label>
                </p>
                <button type="submit" className="btn btn-dark">Register</button>
            </form>
        </div>
    );
}