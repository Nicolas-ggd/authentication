import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoutes } from "./utils/PrivateRoutes"
import { Page404 } from "./components/404Page/Page404";
import { Auth } from "./components/auth/Auth";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}></Route>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  )
}

export default App
