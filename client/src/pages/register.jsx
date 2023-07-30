export function UserRegister () {
    return (
        <div className="Epi">
            <h1>Podder Fodder Registration</h1>
            <p>Provide your name, a valid email address, a username and enter your password twice to register.</p>
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
                <ul className="ruleList">Password requirements: 
                    <li className="ruleItem">between 7 and 15 characters</li>
                    <li className="ruleItem">one uppercase letter</li>
                    <li className="ruleItem">one lowercase letter</li>
                    <li className="ruleItem">one numeric digit</li>
                </ul>
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
            <p>If you provide an invalid email address or password, or if your passwords don&apos;t match,<br /> you will be redirected back here</p>
        </div>
    );
}