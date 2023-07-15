// auth0 and react imports
// import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
// auth0 authentication guard compoent import
// import { AuthenticationGuard } from './authentication-guard';
// interface component imports
// import { NavBarButtons } from './buttons/nav-bar-buttons';
import MainUi from './MainUi.jsx';
import { HomePage } from './pages/home.jsx';
// import './Epi.css';

// main user interface component
export function RoutesUi() {
    // pulls in auth0 variables about state and the user
    // const { isLoading } = useAuth0();

    // // if the authentication layer is still loading, gives loading phase
    // if (isLoading) {
    //     return (
    //         <div className="Epi">
    //             <p>Loading</p>
    //         </div>
    //     )
    // }

    // main frontend routes definition and render return
    return (
        <div>
            {/* <NavBarButtons /> */}
            <Routes>
                {/* root route for unauthenticated acces */}
                <Route path="/" element={<HomePage />} />
                {/* app route for authenticated access */}
                <Route path="/app" element={<MainUi />} />
            </Routes>
        </div>
    );
};

export default RoutesUi;