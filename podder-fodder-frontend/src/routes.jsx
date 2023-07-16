// auth0 and react imports
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import MainUi from './MainUi.jsx';
import { HomePage } from './pages/home.jsx';
// main user interface component
export function RoutesUi() {
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