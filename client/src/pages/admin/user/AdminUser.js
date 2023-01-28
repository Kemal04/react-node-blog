import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminUser = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/user', {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                setUsers(res.data.users)
            } catch (err) {
                console.log(err)
            }
        }
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {

        await axios.delete('http://localhost:3001/user/delete/' + id, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data.success)
                const del = users.filter(users => id !== users.id)
                setUsers(del)
            }).catch((error) => {
                toast.error(error.message)
            });

    }

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <AdminNavbar />
                    <Sidebar />
                    <div className="content-wrapper text-dark" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container py-5'>
                                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                                    Ulanyjylar bölümi
                                    <Link to="/admin/ulanyjy-gos" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Suraty</th>
                                                    <th scope="col">Ulanyjy Ady</th>
                                                    <th scope="col">E-mail adresi</th>
                                                    <th scope="col">Role</th>
                                                    <th scope="col">Duzeltmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    users.map((user, index) => (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{user.img}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                {user.roleId === 1 && <div className='text-success fw-bold'>{user.role.name}</div>}
                                                                {user.roleId === 2 && <div className='text-warning fw-bold'>{user.role.name}</div>}
                                                                {user.roleId === 3 && <div className='text-danger fw-bold'>{user.role.name}</div>}
                                                            </td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-warning' to={`/admin/ulanyjy-uytget/${user.id}`}>Duzeltmek</Link>
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(user.id)}>Pozmak</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
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

export default AdminUser