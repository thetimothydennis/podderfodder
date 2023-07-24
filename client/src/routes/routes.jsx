import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainUi from '../MainUi.jsx';
import { HomePage } from '../pages/interstitials.jsx';
import { UserLogin } from '../pages/login.jsx';
import { UserRegister } from '../pages/register.jsx';

// main user interface component
export function RoutesUi() {

    // main frontend routes definition and render return
    return (
        <div>
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