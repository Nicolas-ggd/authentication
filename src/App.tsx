import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoutes"
import { Page404 } from "./components/404Page/Page404";
import { Auth } from "./components/auth/Auth";
import { SignIn } from "./components/auth/signIn/SignIn";
import { ForgotPassword } from "./components/auth/forgotPassword/ForgotPassword";
import { OTPVerification } from "./components/auth/OTPVerify/OTPVerification";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}></Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Auth />} />
        <Route path="/verify" element={<SignIn />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/otp-verify/:mobileNumber" element={<OTPVerification />} />
      </Routes>
    </Router>
  )
}

export default App
