import React, { useEffect } from "react";
import Email from "../../components/form-parts/email";
import PassRecoveryNote from "../../components/text-blocks/pass-recovery-note";
import CheckEmail from "../../components/text-blocks/check-email";

function ForgotPassword() {
  
  useEffect(() => {
    document.title = "Forgot Password - Podder Fodder";
  }, []);

  return (
    <div className="Epi">
      <h1>Forgot Password</h1>
      <PassRecoveryNote />
      <form className="container" method="POST" action="/api/forgotpassword">
        <Email />
        <button type="submit" className="btn btn-dark">
          Send reset link
        </button>
      </form>
      <CheckEmail />
    </div>
  );
}

export default ForgotPassword;