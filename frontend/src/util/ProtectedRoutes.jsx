import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const ProtectedRoutes = ()=>{

    const {authState} = useAuth()
    
    return (
        authState.isAuthenticated ? <Outlet/> : <Navigate to="user/login"/>
    )
}

export default ProtectedRoutes