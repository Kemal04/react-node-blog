import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ModeratorNavbar from '../../../components/moderator/ModeratorNavbar'
import ModeratorSidebar from '../../../components/moderator/ModeratorSidebar'

const ModeratorBlog = () => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3001/modblog/', {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                setBlogs(res.data.blogs)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBlogs()
    }, [])
    
    const handleDelete = async (id) => {

        await axios.delete('http://localhost:3001/modblog/delete/' + id, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                toast.success(res.data.success)
                const del = blogs.filter(blogs => id !== blogs.id)
                setBlogs(del)
            }).catch((error) => {
                toast.error(error.message)
            });
    }

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <ModeratorNavbar />
                    <ModeratorSidebar />
                    <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container'>
                                <div className='d-flex justify-content-between aling-items-center h2 mb-5'>
                                    Blog bölümi
                                    <Link to="/moderator/blog-gos" className='text-decoration-none'>+</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <table className="table">
                                            <thead className='table-dark'>
                                                <tr>
                                                    <th scope="col">№</th>
                                                    <th scope="col">Ady</th>
                                                    <th scope="col">Kici kategoriyasy</th>
                                                    <th scope="col">Uytgetmek</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    blogs.map((blog, index) => (
                                                        <tr key={index}>
                                                            <td>{index}</td>
                                                            <td>{blog.title}</td>
                                                            <td className='text-muted'>{blog.subcategory.name}</td>
                                                            <td>
                                                                <Link className='me-3 btn btn-sm btn-primary' to={`/moderator/blogym/${blog.id}`}>Gormek</Link>
                                                                <Link className='me-3 btn btn-sm btn-warning' to={`/moderator/blogymy-uytget/${blog.id}`}>Uytgetmek</Link>
                                                                <button onClick={() => handleDelete(blog.id)} className='me-3 btn btn-sm btn-danger'>Pozmak</button>
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

export default ModeratorBlog
