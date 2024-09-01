import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

let NavBar = (props) => {

    const {authState,login,logout} = useAuth()

    const navigate = useNavigate()

    const handleLogout = ()=>{
        logout()
        navigate("/")
        
    }
  return (
    <>
      <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="bi bi-phone"></i>
            {props.header}
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
                {
                    authState.isAuthenticated ? <>
                        <li className="nav-item">
                          <button onClick={handleLogout} className="nav-link px-2 btn btn-link">
                            Logout
                          </button>
                        </li>
                    </>:
                    <>
                    <li className="nav-item">
                        <Link to="/user/login" className="nav-link px-2">
                        Login
                        </Link>
                        </li>
                    </>
                }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;