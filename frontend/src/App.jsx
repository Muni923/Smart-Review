import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./Pages/Home"
import Logout from "./Components/Logout";
import Auth from "./Components/Auth";

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <Auth>
              <Home />
            </Auth>
          }
        />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;