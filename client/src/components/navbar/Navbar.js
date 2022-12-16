import React from 'react'
import $ from 'jquery';
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = ({ authState }) => {
    return (
        <div className="navbar navbar-expand-lg navbar-light">
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
                        <NavLink to="/makalalar" className="nav-item nav-link text-uppercase me-3">makalalar</NavLink>
                        <NavLink to="/biz-barada" className="nav-item nav-link text-uppercase me-3">biz barada</NavLink>
                        <NavLink to="/habarlasmak" className="nav-item nav-link text-uppercase me-3">habarlaşmak</NavLink>
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
                                            <li><NavLink to={`/ulanyjy-profili/${authState.id}`} className="dropdown-item bg-white text-black">Profile</NavLink></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item bg-white text-black">Logout</button></li>
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