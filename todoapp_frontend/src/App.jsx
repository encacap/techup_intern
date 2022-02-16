import { Route, Routes } from "react-router-dom";

import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/accounts/*">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify-email" element={<VerifyEmail />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                </Route>
                <Route path="*" element={<Home />} />
            </Routes>
        </>
    );
};

export default App;
