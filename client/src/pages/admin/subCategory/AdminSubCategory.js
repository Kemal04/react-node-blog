import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminSubCategory = () => {

    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/subCategory')
                setSubCategories(res.data.subCategories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSubCategories()
    }, [])

    const handleDelete = async (id) => {

        await axios.delete('http://localhost:3001/subCategory/delete/' + id)
            .then((res) => {
                toast.success(res.data.success)
                window.location.reload()
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
                    <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container py-5'>
                                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                                    Kici kategoriylar bölümi
                                    <Link to="/admin/kici-kategoriya-gos" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Ady</th>
                                                    <th scope="col">Degisli kategoriyasy</th>
                                                    <th scope="col">Duzeltmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    subCategories.map(subCategory => (
                                                        <tr key={subCategory.id}>
                                                            <td>{subCategory.id}</td>
                                                            <td>{subCategory.name}</td>
                                                            <td className='text-muted'>{subCategory.category.name}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-warning' to={`/admin/kici-kategoriya-uytget/${subCategory.id}`}>Duzeltmek</Link>
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(subCategory.id)}>Pozmak</button>
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

export default AdminSubCategory