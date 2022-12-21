import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminCategory = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/category')
                setCategories(res.data.categories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCategories()
    }, [])

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
                                    Kategoriylar bölümi
                                    <Link to="/" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Ady</th>
                                                    <th scope="col">Duzeltmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    categories.map(category => (
                                                        <tr key={category.id}>
                                                            <td>{category.id}</td>
                                                            <td>{category.name}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-warning' to="/">Duzeltmek</Link>
                                                                <button className='btn btn-sm btn-danger' to="/">Pozmak</button>
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

export default AdminCategory