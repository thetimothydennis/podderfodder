import React from "react";
import PasswordReqs from "../../components/text-blocks/password-reqs";
import RegistrationNotice from "../../components/text-blocks/registration-notice";
import PassMatch from "../../components/form-parts/pass-match";
import Password from "../../components/form-parts/password";
import Username from "../../components/form-parts/username";
import Email from "../../components/form-parts/email";
import Name from "../../components/form-parts/name";

function UserRegister() {
  return (
    <div>
      <h1>Podder Fodder Registration</h1>
      <RegistrationNotice />

      <div className="Epi">
        <form className="container" method="POST" action="/api/register">
          <Name />
          <Email />
          <Username />
          <PasswordReqs />
          <Password />
          <PassMatch />
          <button type="submit" className="btn btn-dark">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
