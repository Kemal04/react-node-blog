import React from 'react'
import $ from 'jquery';
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
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
                    </div>
                    <div className='ms-auto'>
                        <div class="">
                            <input type="text" placeholder='Gözleg . . .' class="form-control border-0 text-white search rounded-1 py-2 px-4" style={{ backgroundColor: "rgba(255,255,255,0.2)", outline: "none" }} />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

$(document).ready(function () {
    "use strict";

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });

});

export default Navbar