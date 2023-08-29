import React, { useEffect } from "react";
import Username from "../../components/form-parts/username";
import Password from "../../components/form-parts/password";
import GoogleButton from "../../components/buttons/google-button";
import GithubButton from "../../components/buttons/github-button";
import NoAccountNote from "../../components/text-blocks/no-account";
import ForgotPasswordNote from "../../components/text-blocks/forgot-password-note";

function UserLogin() {
  useEffect(() => {
    document.title = "Login - Podder Fodder";
  }, []);

  return (
    <div className="Epi">
      <h1>Podder Fodder Login</h1>
      <p>You must log in before accessing the platform.</p>
      <form className="container" method="POST" action="/api/login">
        <Username />
        <Password />
        <button type="submit" className="btn btn-dark">
          Login
        </button>
        <NoAccountNote />
        <ForgotPasswordNote />
        <p>Or, you can login with one of these social providers:</p>
        <div className="row">
          <GithubButton />
          <GoogleButton />
        </div>
      </form>
    </div>
  );
}

export default UserLogin;