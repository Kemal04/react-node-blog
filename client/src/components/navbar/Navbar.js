import React, { useContext } from 'react'
import $ from 'jquery';
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {

    const { authState, setAuthState } = useContext(AuthContext)

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ email: "", id: 0, status: false, role: "User" })
    };

    return (
        <div className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <NavLink to="/" className="navbar-brand text-white fw-bold">
                    Logo
                </NavLink>
                <button className="navbar-toggler bg-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto ms-4">
                        <NavLink to="/" className="nav-item nav-link text-uppercase me-3">bas sahypa</NavLink>
                        <NavLink to="/tazelikler" className="nav-item nav-link text-uppercase me-3">Täzelikler</NavLink>
                        <NavLink to="/reklamalar" className="nav-item nav-link text-uppercase me-3">Reklamalar</NavLink>
                        <NavLink to="/biz-barada" className="nav-item nav-link text-uppercase me-3">biz barada</NavLink>
                        {
                            !authState.status
                                ?
                                <NavLink to="/giris-etmek" className="nav-item nav-link text-uppercase me-3">Login</NavLink>
                                :
                                <div className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle text-white" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ letterSpacing: "1px" }}>
                                            {authState.email}
                                        </NavLink>
                                        <ul className="dropdown-menu rounded-0">

                                            {
                                                authState.role === 1 && <li><NavLink to="/admin" className="dropdown-item bg-white text-black">Admin</NavLink></li>
                                            }
                                            {
                                                authState.role === 2 && <li><NavLink to={`/moderator/${authState.id}`} className="dropdown-item bg-white text-black">Moderator</NavLink></li>
                                            }
                                            {
                                                authState.role === 3 && <li><NavLink to={`/ulanyjy-profili/${authState.id}`} className="dropdown-item bg-white text-black">Profil</NavLink></li>
                                            }
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button onClick={logout} className="dropdown-item bg-white text-black">Logout</button></li>
                                        </ul>
                                    </li>
                                </div>
                        }
                    </div>
                    <div className='ms-auto'>
                        <div className="">
                            <input type="text" placeholder='Gözleg . . .' className="form-control border-0 text-white search rounded-1 py-2 px-4" style={{ backgroundColor: "rgba(255,255,255,0.2)", outline: "none" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });

});

export default Navbar