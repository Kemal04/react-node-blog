import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import Sidebar from '../../../components/admin/Sidebar';

const AdminUserCreate = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        cPassword: ""
    })

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        if (!user.name) {
            toast.error("Adyňyzy ýazyň!")
        }
        else if (!user.email) {
            toast.error("E-mail adresiňizi ýazyň!")
        }
        else if (!user.password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (!user.cPassword) {
            toast.error("Açar sözüňizi gaýtadan ýazyň!")
        }
        else if (user.cPassword !== user.password) {
            toast.error("Açar sözüňiz gabat gelenok !")
        }
        else if (user.password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post("http://localhost:3001/auth/register", {
                name: user.name,
                email: user.email,
                password: user.password,
            }).then((res) => {
                navigate("/admin/ulanyjylar")
                toast.success(res.data)
            }).catch((res) => {
                toast.error(res.data.error)
            })
        }
    }

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <AdminNavbar />
                    <Sidebar />
                    <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6'>
                                        <div className='my-5 py-5'>
                                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                                Kici Kategoriýa Goşmak
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label">Name</label>
                                                    <input onChange={handleChange} name='name' type="name" className="form-control" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label">Email address</label>
                                                    <input onChange={handleChange} name='email' type="email" className="form-control" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input onChange={handleChange} name='password' type="password" className="form-control" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label">Confirim Password</label>
                                                    <input onChange={handleChange} name='cPassword' type="password" className="form-control" />
                                                </div>

                                                <div className='d-grid mt-3'>
                                                    <button onClick={handleClick} type="submit" className="btn btn-success">Goşmak</button>
                                                </div>

                                            </form>
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

export default AdminUserCreate