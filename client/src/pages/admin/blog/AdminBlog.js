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
                const res = await axios.get('http://localhost:3001/blog')
                setBlogs(res.data.blogs)
                console.log(res.data.blogs);
            } catch (err) {
                console.log(err)
            }
        }
        fetchBlogs()
    }, [])

    const handleDelete = async (id) => {

        await axios.delete('http://localhost:3001/blog/delete/' + id)
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
                                    Blog bölümi
                                    <Link to="/admin/blog-gos" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Ady</th>
                                                    {/* <th scope="col">Dusundirisi</th> */}
                                                    {/* <th scope="col">Suraty</th> */}
                                                    {/* <th scope="col">Goren adam sany</th> */}
                                                    {/* <th scope="col">Like sany</th> */}
                                                    <th scope="col">Kici kategoriyasy</th>
                                                    <th scope="col">Duzeltmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    blogs.map(blog => (
                                                        <tr key={blog.id}>
                                                            <td>{blog.id}</td>
                                                            <td>{blog.title}</td>
                                                            {/* <td>{blog.description}</td> */}
                                                            {/* <td>{blog.img}</td> */}
                                                            {/* <td>{blog.viewed}</td> */}
                                                            {/* <td>{blog.liked}</td> */}
                                                            <td className='text-muted'>{blog.subcategory.name}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-primary' to={`/admin/kici-kategoriya/${blog.id}`}>Gormek</Link>
                                                                <Link className='me-3 btn btn-sm btn-warning' to={`/admin/kici-kategoriya-uytget/${blog.id}`}>Duzeltmek</Link>
                                                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(blog.id)}>Pozmak</button>
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