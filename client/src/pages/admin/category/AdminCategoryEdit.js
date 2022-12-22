import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminCategoryEdit = () => {

    const [category, setCategory] = useState("")

    const navigate = useNavigate()
    const location = useLocation();

    const categoryId = location.pathname.split("/")[3];


    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/category/edit/${categoryId}`).then((res) => {
            setCategory(res.data.category)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [categoryId])


    const handleClick = async (e) => {
        e.preventDefault()

        if (!category.name) {
            toast.error("Adyny ýazyň")
        } else {
            await axios.post(`http://localhost:3001/category/edit/${categoryId}`, category)
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/kategoriyalar")
                }).catch((error) => {
                    toast.error(error.message)
                });
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
                                                Kategoriýa Goşmak
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label fw-bold">Kategoriýa Ady</label>
                                                    <input value={category.name} onChange={handleChange} name='name' type="text" className="form-control rounded-0" autoComplete="off" />
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

export default AdminCategoryEdit