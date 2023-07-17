import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./login-button.jsx";
import { LogoutButton } from "./logout-button.jsx";
import { SignupButton } from "./signup-button.jsx";

export const NavBarButtons = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated && (
        <>
          <ul className="NavBar">
            <li>
              You need to log in.
            </li>
            <li>
              <SignupButton />
            </li>
            <li>
              <LoginButton />
            </li>
          </ul>
        </>
      )}
      {isAuthenticated && (
        <>
            <ul className="NavBar">
              <li><em>Welcome back {user.given_name}</em></li>
              <li><LogoutButton /></li>
            </ul>
        </>
      )}
    </div>
  );
};
