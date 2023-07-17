// imports for Auth0 and react components
import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

// functional component for use in index.js, takes children as parameter
export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  // pulls in environment variables for connecting to auth0
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  // handles redirect to the callback path after authentication
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  // if any of the environment variables are absent, returns null data
  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  // render return, passes the environment vairables into the component, as well as the child components
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
