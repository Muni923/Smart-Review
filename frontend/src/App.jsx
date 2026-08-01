import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./Pages/Home"
import Logout from "./Components/Logout";

function App() {
  return (<>
    <BrowserRouter>
    <Home></Home>
    
      <Routes>
      
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </BrowserRouter>
    </>
);
}

export default App;