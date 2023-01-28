import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../../context/AuthContext'

const ModeratorSidebar = () => {

    const { authState } = useContext(AuthContext)

    const id = authState.id
    
    const [user, setUser] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/user/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setUser(res.data.users);
        });
    }, [id]);

    return (
        <>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/img/icons/user.svg" className="img-circle elevation-2" alt='user' />
                        </div>
                        <div className="info">
                            <Link to="" className="d-block text-uppercase text-decoration-none">{user.name}</Link>
                        </div>
                    </div>

                    <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
                        <div className="image">
                            <i className="fas fa-home text-white"></i>
                        </div>
                        <div className="info">
                            <Link to="/moderator" className="d-block text-uppercase text-decoration-none">Esasy Sahypa</Link>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <Link to="/moderator/bloglarym" className="nav-link">
                                    <p> Bloglarym </p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    )
}

export default ModeratorSidebar