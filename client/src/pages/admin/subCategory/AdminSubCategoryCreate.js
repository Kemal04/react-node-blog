import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminSubCategoryCreate = () => {

    const [subCategory, setSubCategory] = useState({
        name: "",
        categoryId: ""
    })

    const handleChange = (e) => {
        setSubCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        if (!subCategory.name) {
            toast.error("Adyny ýazyň")
        }
        else if (!subCategory.categoryId) {
            toast.error("Kategoriya sayla")
        }
        else {
            await axios.post("http://localhost:3001/subCategory/create", subCategory, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/kici-kategoriyalar")
                }).catch((error) => {
                    toast.error(error.message)
                });
        }
    }

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/category/')
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
                            <div className='container'>
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6'>
                                        <div className='my-5 py-5'>
                                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                                Kici Kategoriýa Goşmak
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Kategoriýan Ady</label>
                                                    <select name='categoryId' className="form-select rounded-0" onChange={handleChange}>
                                                        <option defaultValue>Kategoriýa sayla</option>
                                                        {categories.map(category => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Kici Kategoriýa Ady</label>
                                                    <input onChange={handleChange} name='name' type="text" className="form-control rounded-0" autoComplete="off" />
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

export default AdminSubCategoryCreate