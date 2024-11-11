import React from "react";
import logo from "../logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    <img style={{ width: "25%" }} src={logo} alt="Logo" />
                </NavLink>
                <div className="navbar" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <NavLink className="nav-link" to="/userRegistration" onClick={() => {sessionStorage.removeItem('staffToken'); sessionStorage.removeItem('token');}}>
                            User Registration
                        </NavLink>
                        <NavLink className="nav-link" to="/" onClick={() => {sessionStorage.removeItem('staffToken'); sessionStorage.removeItem('token');}}>
                            User Login
                        </NavLink>
                        <NavLink className="nav-link" to="/staffLogin" onClick={() => {sessionStorage.removeItem('staffToken'); sessionStorage.removeItem('token');}}>
                            Staff Login
                        </NavLink>



                    </ul>
                </div>
            </nav>
        </div>
    );
}