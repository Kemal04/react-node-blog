import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminBlogRead = () => {

    const [blog, setBlog] = useState("")
    const [subCategory, setSubCategory] = useState("")

    const location = useLocation();
    const blogId = location.pathname.split("/")[3];

    useEffect(() => {
        axios.get(`http://localhost:3001/blog/${blogId}`).then((res) => {
            setBlog(res.data.blog)
            setSubCategory(res.data.blog.subcategory)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [blogId])

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
                                    <div className='col-lg-8'>
                                        <div className='card rounded-0'>
                                            <img src={`http://localhost:3001/img/${blog.img}`} alt='' className='img-fluid' />
                                            <div className='card-body'>
                                                <div className='small'>subCategory:{subCategory.name}</div>
                                                <div className='card-title h4'>{blog.title}</div>
                                                <div className='card-text mt-5'>{blog.description}</div>
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

export default AdminBlogRead