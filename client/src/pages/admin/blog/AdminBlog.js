import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminBlog = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3001/blog/')
                setBlogs(res.data.blogs)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBlogs()
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
                                    Blog bölümi
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Ady</th>
                                                    <th scope="col">Kici kategoriyasy</th>
                                                    <th scope="col">Gormek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    blogs.map((blog,index) => (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{blog.title}</td>
                                                            <td className='text-muted'>{blog.subcategory.name}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-primary' to={`/admin/blog/${blog.id}`}>Gormek</Link>
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

export default AdminBlog