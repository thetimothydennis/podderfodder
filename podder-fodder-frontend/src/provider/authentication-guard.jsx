// auth0 and react imports
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
// component for loading page
import { PageLoader } from "./page-loader";

// authenticationGuard takes the component to be restricted as parameter
export const AuthenticationGuard = ({ component }) => {
  /**
   * calls the withAuthenticationRequired method from auth0 library
   * passes in the component parameter as the first parameter
   * object as second param
   *  object method onRedirecting defines what to render when redirect is happening
   */
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="Epi">
        <PageLoader />
      </div>
    ),
  });
  // returns the authenticated component
  return <Component />;
};
