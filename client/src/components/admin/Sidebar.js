import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/img/icons/user.svg" className="img-circle elevation-2" alt='user' />
                        </div>
                        <div className="info">
                            <Link to="" className="d-block text-uppercase text-decoration-none">Kemal</Link>
                        </div>
                    </div>

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                        <div className="image">
                            <i className="fas fa-home text-white"></i>
                        </div>
                        <div className="info">
                            <Link to="/admin" className="d-block text-uppercase text-decoration-none">Esasy Sahypa</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to="/admin/ulanyjylar" className="nav-link">
                                    <p> Ulanyjylar </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/kategoriyalar" className="nav-link">
                                    <p> Kategoriýalar </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/kici-kategoriyalar" className="nav-link">
                                    <p> Kiçi Kategoriýalar </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/bloglar" className="nav-link">
                                    <p> Bloglar </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/reklamalar" className="nav-link">
                                    <p> Reklamalar </p>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/admin/teswirler" className="nav-link">
                                    <p> Teswirler </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default Sidebar