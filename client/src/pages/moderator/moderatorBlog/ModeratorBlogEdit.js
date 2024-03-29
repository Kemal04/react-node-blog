import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ModeratorNavbar from '../../../components/moderator/ModeratorNavbar'
import ModeratorSidebar from '../../../components/moderator/ModeratorSidebar'

const ModeratorBlogEdit = () => {

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

    const [subCategory, setSubCategory] = useState("")

    const [blog, setBlog] = useState({
        subcategoryId: "",
        title: "",
        description: "",
        img: "",
    })

    const [img, setImg] = useState('')

    const uploadPicture = (e) => {
        setImg({
            picturePreview: URL.createObjectURL(e.target.files[0]),
            pictureAsFile: e.target.files[0],
        });
    };

    const navigate = useNavigate()
    const location = useLocation();

    const blogId = location.pathname.split("/")[3];


    const handleChange = (e) => {
        setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/modblog/edit/${blogId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            setBlog(res.data.blog)
            setSubCategory(res.data.blog.subcategory)
            setImg(res.data.blog.img)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [blogId])


    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', blog.title)
        formData.append('subcategoryId', blog.subcategoryId)
        formData.append('description', blog.description)
        formData.append('img', img.pictureAsFile)

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
            await axios.post(`http://localhost:3001/modblog/edit/${blogId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/moderator/bloglarym")
                }).catch((error) => {
                    toast.error(error.message)
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
                                                Blog Uytgetmek
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label fw-bold">Kategoriýan Ady</label>
                                                    <select name='subcategoryId' className="form-select" onChange={handleChange}>
                                                        <option defaultValue value={subCategory.id}>{subCategory.name}</option>
                                                        {subCategories.map(subCategory => (
                                                            <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Blog Ady</label>
                                                    <input value={blog.title} onChange={handleChange} name='title' type="text" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Blog Suraty</label>
                                                    <input name='img' onChange={uploadPicture} type="file" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="form-label fw-bold">Blog Mazmuny</label>
                                                    <textarea value={blog.description} onChange={handleChange} name='description' type="text" className="form-control rounded-0" rows="5" autoComplete="off"></textarea>
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

export default ModeratorBlogEdit
