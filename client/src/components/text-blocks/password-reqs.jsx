import React from "react";

function PasswordReqs() {
  return (
    <ul className="ruleList">
      <b>Password requirements: </b>
      <li className="ruleItem">between 7 and 15 characters</li>
      <li className="ruleItem">one uppercase letter</li>
      <li className="ruleItem">one lowercase letter</li>
      <li className="ruleItem">one numeric digit</li>
    </ul>
  );
}

export default PasswordReqs;
