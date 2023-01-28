import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ModeratorNavbar from "../../../components/moderator/ModeratorNavbar"
import ModeratorSidebar from "../../../components/moderator/ModeratorSidebar"
import { AuthContext } from '../../../context/AuthContext'

const ModeratorInfo = () => {

    const { authState } = useContext(AuthContext)

    const id = authState.id

    const [user, setUser] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/user/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setUser(res.data.users);
            setRole(res.data.users.role);
        });
    }, [id]);

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <ModeratorNavbar />
                    <ModeratorSidebar />
                    <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='d-flex justify-content-center'>
                                        <img src="/img/icons/user-1.jpg" alt="" className='rounded-circle' style={{ width: "150px", marginTop: "-70px" }} />
                                    </div>
                                    <div className='my-4 text-center'>
                                        <img src={user.img ? user.img : "/img/icons/user.svg"} alt="user" className='img-fluid' style={{ width: "200px" }} />
                                    </div>
                                    <div className='mb-5 small text-center'>
                                        {user.email}
                                    </div>
                                    <div className='row justify-content-center mt-4 mb-5'>
                                        <div className='w-50'>
                                            <div className="card-body">
                                                <div className="row justify-content-between">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Doly Adym</h6>
                                                    </div>
                                                    <div className="col-sm-8 text-secondary">
                                                        {user.name}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row justify-content-between">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">E-mail adresim</h6>
                                                    </div>
                                                    <div className="col-sm-8 text-secondary">
                                                        {user.email}
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row justify-content-between">
                                                    <div className="col-sm-4">
                                                        <h6 className="mb-0">Role</h6>
                                                    </div>
                                                    <div className="col-sm-8 text-secondary">
                                                        {role.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModeratorInfo