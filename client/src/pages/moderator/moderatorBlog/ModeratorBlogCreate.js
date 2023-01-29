import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ModeratorNavbar from '../../../components/moderator/ModeratorNavbar'
import ModeratorSidebar from '../../../components/moderator/ModeratorSidebar'

const ModeratorBlogCreate = () => {

    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/subCategory/')
                setSubCategories(res.data.subCategories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSubCategories()
    }, [])

    const [blog, setBlog] = useState({
        subcategoryId: "",
        title: "",
        description: "",
    })

    const [img, setImg] = useState('')

    const handleChange = (e) => {
        setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('subcategoryId', blog.subcategoryId)
        formData.append('title', blog.title)
        formData.append('img', img)
        formData.append('description', blog.description)

        if (!blog.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!blog.description) {
            toast.error("Mazmuny yazyn")
        }
        else if (!img) {
            toast.error("Surat sayla")
        }
        else if (!blog.subcategoryId) {
            toast.error("Kici Kategoriya sayla")
        }
        else {
            await axios.post("http://localhost:3001/modblog/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/moderator/bloglarym")
                }).catch((res) => {
                    toast.error(res.response.data.error)
                    navigate(`/${res.response.status}`);
                });
        }
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
                                <div className='row justify-content-center'>
                                    <div className='col-lg-6'>
                                        <div className='my-5 py-5'>
                                            <div className='d-flex justify-content-center aling-items-center h2 mb-5'>
                                                Blog Goşmak
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label fw-bold">Kici Kategoriýan Ady</label>
                                                    <select name='subcategoryId' className="form-select rounded-0" onChange={handleChange}>
                                                        <option defaultValue>Kategoriýa sayla</option>
                                                        {subCategories.map(subCategory => (
                                                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Blog Ady</label>
                                                    <input onChange={handleChange} name='title' type="text" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Blog Suraty</label>
                                                    <input name='img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label fw-bold">Blog Mazmuny</label>
                                                    <textarea onChange={handleChange} name='description' type="text" className="form-control rounded-0" rows="5" autoComplete="off"></textarea>
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

export default ModeratorBlogCreate
