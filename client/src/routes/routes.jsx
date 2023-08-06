import { Route, Routes } from 'react-router-dom';
import MainUi from '../MainUi.jsx';
import { HomePage } from '../pages/home-page.jsx';
import { UserLogin } from '../pages/auth-views/login.jsx';
import { UserRegister } from '../pages/auth-views/register.jsx';
import { ChangePassword } from '../pages/auth-views/change-password.jsx';
import { ForgotPassword, ResetPassword } from '../pages/auth-views/forgot-password.jsx';

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
                {/* app route for changing password */}
                <Route path="/changepassword" element={<ChangePassword />} />
                {/* route for step 1 in forgot password workflow */}
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                {/* route for step 2 in forgot password workflow */}
                <Route path="/resetpassword/:token" element={<ResetPassword />} />
            </Routes>
        </div>
    );
}

export default RoutesUi;