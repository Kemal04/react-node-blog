import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'
import './Admin.css'

const Admin = () => {
    const [ads, setAds] = useState([])

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await axios.get('http://localhost:3001/ads')
                setAds(res.data.ads)
            } catch (err) {
                toast.error(err)
            }
        }
        fetchAds()
    }, [])

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

    const [contact, setContact] = useState([])

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const res = await axios.get('http://localhost:3001/contact')
                setContact(res.data.contact)
            } catch (err) {
                console.log(err)
            }
        }
        fetchContact()
    }, [])

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

    return (
        <>
            <div className="hold-transition sidebar-mini layout-fixed">
                <div className="wrapper">
                    <AdminNavbar />
                    <Sidebar />
                    <div className="content-wrapper" style={{ paddingTop: "70px" }}>
                        <div className='content'>
                            <div className='container py-5'>
                                <div className='row mb-5'>
                                    <div className='col-lg-3'>
                                        <div className="row bg-warning p-3 align-items-center mx-3 rounded-3 shadow">
                                            <div className="col-lg-8">
                                                <h3 className='mb-3'>{users.length}</h3>
                                                <p>Ulanyjylar</p>
                                            </div>
                                            <div className="col-lg-4 h1">

                                            </div>
                                            <Link to="/admin/ulanyjylar" className="border-light border-top pt-2 nav-link text-dark pb-0">Maglumatlar</Link>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className="row bg-danger text-white p-3 align-items-center mx-3 rounded-3 shadow">
                                            <div className="col-lg-8">
                                                <h3 className='mb-3'>{contact.length}</h3>
                                                <p>Teswirler</p>
                                            </div>
                                            <div className="col-lg-4 h1">

                                            </div>
                                            <Link to="/admin/teswirler" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar</Link>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className="row bg-success text-white p-3 align-items-center mx-3 rounded-3 shadow">
                                            <div className="col-lg-8">
                                                <h3 className='mb-3'>{ads.length}</h3>
                                                <p>Reklamalar</p>
                                            </div>
                                            <div className="col-lg-4 h1">

                                            </div>
                                            <Link to="/admin/otag-gornusleri" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar</Link>
                                        </div>
                                    </div>
                                    <div className='col-lg-3'>
                                        <div className="row bg-primary text-white p-3 align-items-center mx-3 rounded-3 shadow">
                                            <div className="col-lg-8">
                                                <h3 className='mb-3'>{blogs.length}</h3>
                                                <p>Bloglar</p>
                                            </div>
                                            <div className="col-lg-4 h1">

                                            </div>
                                            <Link to="/admin/otaglar" className="border-light border-top pt-2 nav-link text-white pb-0">Maglumatlar</Link>
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

export default Admin