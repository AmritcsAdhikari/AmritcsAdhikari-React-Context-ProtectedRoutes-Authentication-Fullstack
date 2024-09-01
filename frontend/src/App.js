import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login"
import Home from "./components/Home"
import NavBar from "./components/Navbar";
import Profile from "./components/Profile";
import ProtectedRoutes from "./util/ProtectedRoutes";

let App = () => {
  return (
    <BrowserRouter>
    <NavBar header="Auth Context" color={"bg-dark"}/>
      <Routes>
        <Route path={"/"} element={<Home />}/>
        <Route path={"/user/register"} element={<Register/>}/>
        <Route path={"/user/login"} element={<Login/>}/>
        
        {/* <Route path={"/user/me"} element={<Profile />} /> */}
        {/* Protected Route- Profile : user/me should redirect to user/login if not logged in */}
        <Route  element={<ProtectedRoutes/>}>
          <Route path={"/user/me"} element={<Profile />} />
        </Route>

        {/**All other Undefined Routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
