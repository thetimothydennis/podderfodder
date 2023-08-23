import React, { useEffect } from "react";
import PasswordReqs from "../../components/text-blocks/password-reqs";
import Password from "../../components/form-parts/password";
import PassMatch from "../../components/form-parts/pass-match";

function ChangePassword() {

  useEffect(() => {
    document.title = "Registration - Podder Fodder";
  }, []);

  return (
    <div className="Epi">
      <h1>Change Password</h1>
      <form className="container" method="POST" action="/api/changepassword">
        <PasswordReqs />
        <Password />
        <PassMatch />
        <button type="submit" className="btn btn-dark">
          Change password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
