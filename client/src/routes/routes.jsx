// auth0 and react imports
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { NavBarButtons } from '../assets/buttons/nav-bar-buttons.jsx';
import MainUi from '../MainUi.jsx';
import { HomePage } from '../pages/home.jsx';
import { UserLogin } from '../pages/login.jsx';
import { UserRegister } from '../pages/register.jsx';

import { AuthenticationGuard } from '../provider/authentication-guard.jsx';

// main user interface component
export function RoutesUi() {
    // pulls in auth0 variables about state and the user
    const { isLoading } = useAuth0();

    // if the authentication layer is still loading, gives loading phase
    if (isLoading) {
        return (
            <div>
                <p>Loading</p>
            </div>
        )
    }

    // main frontend routes definition and render return
    return (
        <div>
            <NavBarButtons />
            <Routes>
                {/* root route for unauthenticated acces */}
                <Route path="/" element={<HomePage />} />
                {/* app route for authenticated access */}
                <Route path="/app" element={<MainUi />} />
                {/* app route for logging in */}
                <Route path="/login" element={<UserLogin />} />
                {/* app route for registering */}
                <Route path="/register" element={<UserRegister />} /> 
            </Routes>
        </div>
    );
};
export default RoutesUi;