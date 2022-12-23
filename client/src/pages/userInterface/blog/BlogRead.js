import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const BlogRead = () => {

    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const fetchAllSubCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/subCategory/')
                setSubCategories(res.data.subCategories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllSubCategories()
    }, [])

    const [blog, setBlog] = useState("")
    const [subCategory, setSubCategory] = useState("")

    const navigate = useNavigate()
    const location = useLocation();

    const blogId = location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`http://localhost:3001/blog/${blogId}`).then((res) => {
            setBlog(res.data.blog)
            setSubCategory(res.data.blog.subcategory)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [blogId])



    // console.log(formatDate(dateString))

    return (
        <>

            <div className='home-bg'>
                <div className='container'>
                    <div className='row flex-column aling-items-center justify-content-start text-white'>
                        <div className='col-lg-2 text-center'>
                            <div className='rounded-5 bg-secondary text-white py-1 px-3 fw-normal mt-3'>Tazelikler</div>
                        </div>
                        <div className='col-lg-5 h1 fw-normal mt-3'>
                            How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?
                        </div>
                        <div className='col-lg-12 mt-4 disabled' style={{ color: "#afafaf" }}>
                            Continue Reading &rarr;
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='row'>
                    <div className='col-lg-9 my-5 py-5'>
                        <div className='h1'>
                            {blog.title}
                        </div>
                        <div className='d-flex'>
                            <div className='fw-bold text-muted'>Kemal Hojayew -</div>
                            <div className=''>
                                {new Date(blog.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric", })}
                            </div>
                        </div>
                        <div className='mt-5 me-5 text-center'>
                            <img src={blog.img} alt={blog.title} className="img-fluid" />
                        </div>
                        <div className='mt-3 me-5' style={{ lineHeight: "30px", fontSize: "18px", wordSpacing: "2px", textAlign: "justify" }}>
                            {blog.description}
                        </div>
                    </div>
                    <div className='col-lg-3 pt-5 px-4' style={{ backgroundColor: "#ededed " }}>
                        <div className='fw-bold'>Top Stories</div>
                        <div className='row mt-5'>
                            <div className='col-lg-12'>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/1.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/2.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/3.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/4.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start my-5 position-relative'>
                            <img src="/img/ads/1.jpg" alt="ads" className='img-fluid w-75' />
                            <div className="position-absolute bottom-0 w-75 text-white p-4">
                                <div className='small text-warning mb-3 fw-bold'>-32%</div>
                                <div className="card-title h5">How Did van Gogh’s Turbulent Mind</div>
                            </div>
                        </div>
                        <div className='fw-bold'>Newest Videos</div>
                        <div className='row mt-5'>
                            <div className='col-lg-12'>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/1.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/2.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/3.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mb-4 border-0" style={{ background: "transparent" }}>
                                    <div className="row g-0 align-items-center justify-content-center">
                                        <div className="col-md-4">
                                            <img src="/img/mini-cards/4.jpg" className="img-fluid rounded-2" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body p-0">
                                                <div className="card-title small fw-bold">How Did van Gogh’s Turbulent Mind</div>
                                                <div style={{ fontSize: "13px" }}><Link to="/" className='text-decoration-none text-dark'>Kemal </Link><span>&#9679; Sep 29</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-start my-5 position-relative'>
                            <img src="/img/ads/2.jpg" alt="ads" className='img-fluid w-75' />
                            <div className="position-absolute mt-4 w-75 text-white p-4">
                                <div className="card-title h5">Turbulent Mind</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogRead