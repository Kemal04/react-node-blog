import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminUserEdit = () => {

    const [user, setUser] = useState("")
    const [role, setRole] = useState("")

    const navigate = useNavigate()
    const location = useLocation();

    const userId = location.pathname.split("/")[3];

    const handleChange = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/user/edit/${userId}`).then((res) => {
            setUser(res.data.user)
            setRole(res.data.user.role)
            console.log(res.data.user.role)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [userId])


    const handleClick = async (e) => {
        e.preventDefault()

        if (!user.name) {
            toast.error("Adyny ýazyň")
        }
        else if (!user.email) {
            toast.error("E-mail adresi ýazyň")
        }
        else if (!user.password) {
            toast.error("Acar sozunu ýazyň")
        }
        else if (!user.roleId) {
            toast.error("Role sayla")
        }
        else {
            await axios.post(`http://localhost:3001/user/edit/${userId}`, user)
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/ulanyjylar")
                }).catch((error) => {
                    toast.error(error.message)
                });
        }
    }

    const [roles, setRoles] = useState([])

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const res = await axios.get('http://localhost:3001/role/')
                setRoles(res.data.roles)
            } catch (err) {
                console.log(err)
            }
        }
        fetchRoles()
    }, [])

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
                                                Ulanyjy Uytget
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-6 mb-5">
                                                    <label className="form-label fw-bold">Role Ady <span className='text-danger'>*</span></label>
                                                    <select name='roleId' className="form-select rounded-0" onChange={handleChange}>
                                                        <option defaultValue value={role.id}>{role.name}</option>
                                                        {roles.map(role => (
                                                            <option key={role.id} value={role.id}>{role.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-lg-6 mb-5">
                                                    <label className="form-label fw-bold">Ulanyjy Ady</label>
                                                    <input value={user.name} onChange={handleChange} name='name' type="text" className="form-control rounded-0" autoComplete="off" disabled/>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Ulanyjy E-maili</label>
                                                    <input value={user.email} onChange={handleChange} name='name' type="email" className="form-control rounded-0" autoComplete="off" disabled/>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Ulanyjy Acar sozi</label>
                                                    <input value={user.password} onChange={handleChange} name='name' type="password" className="form-control rounded-0" autoComplete="off" disabled/>
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

export default AdminUserEdit