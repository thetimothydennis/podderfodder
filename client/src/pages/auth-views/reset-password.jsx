import React, { useEffect } from "react";
import { useParams } from "react-router";
import PasswordReqs from "../../components/text-blocks/password-reqs";
import Password from "../../components/form-parts/password";
import PassMatch from "../../components/form-parts/pass-match";
import ResetPassNote from "../../components/text-blocks/reset-pass-note";

export function ResetPassword() {
  const { token } = useParams();

  useEffect(() => {
    document.title = "Reset Password - Podder Fodder";
  }, []);

  return (
    <div className="Epi">
      <h1>Reset Password</h1>
      <ResetPassNote />
      <form
        className="container"
        method="POST"
        action={`/api/resetpassword/${token}`}
      >
        <PasswordReqs />
        <Password />
        <PassMatch />
        <button type="submit" className="btn btn-dark">
          Reset password
        </button>
      </form>
    </div>
  );
}
