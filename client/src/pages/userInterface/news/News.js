import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const News = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3001/category/')
                setCategories(res.data.categories)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllCategories()
    }, [])

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        const fetchAllBlogs = async () => {
            try {
                const res = await axios.get('http://localhost:3001/blog/')
                setBlogs(res.data.blogs)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllBlogs()
    }, [])

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
                    <div className='col-lg-9 mt-5'>
                        <div className='row align-items-center me-4 mb-5'>
                            <div className='col-lg-3'>
                                <div className='fw-bold h5'>Tazelikler</div>
                            </div>
                            <div className='col-lg-9'>
                                <ul className="nav justify-content-start">
                                    <li className="nav-item small mx-1">
                                        <Link to="/" className="nav-link rounded-5 py-1 px-3 text-dark bg-light">Hemmesi</Link>
                                    </li>
                                    {
                                        categories.map((category) => (
                                            <li className="nav-item small mx-1" key={category.id}>
                                                <Link to={`/kategoriya/${category.id}`} className="nav-link rounded-5 py-1 px-3 text-dark" style={{ backgroundColor: "#ededed" }}>{category.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                        
                        <div className='row mb-5 pb-5'>
                            {
                                blogs.sort((a, b) => a.id > b.id ? -1 : 1).map((blog, index) => (
                                    index % 2 === 0
                                        ?
                                        <Link key={index} to={`/blog/${blog.id}`} className='col-lg-4 mb-4 text-decoration-none text-dark d-flex align-items-stretchk'>
                                            <div className="card border-0 rounded-3 me-4 shadow">
                                                <img src={`http://localhost:3001/img/${blog.img}`} className="card-img-top rounded-0" alt="card" />
                                                <div className="card-body">
                                                    <div className="card-title fw-bold">{blog.title}</div>
                                                    <div style={{ fontSize: "13px" }} className="mt-3"><span className='fw-bold'>Kemal </span><span>Sep 29, 2022 at 9:48 am</span></div>
                                                </div>
                                            </div>
                                        </Link>
                                        :
                                        <Link key={index} to={`/blog/${blog.id}`} className='col-lg-4 mb-4 text-decoration-none text-dark d-flex align-items-stretch'>
                                            <div className="card border-0 rounded-3 me-4 shadow">
                                                <div className="card-body">
                                                    <div className="card-title fw-bold">{blog.title}</div>
                                                    <div style={{ fontSize: "13px" }} className="mt-3"><span className='fw-bold'>Kemal </span><span>Sep 29, 2022 at 9:48 am</span></div>
                                                </div>
                                                <img src={`http://localhost:3001/img/${blog.img}`} className="card-img-top rounded-0" alt="card" />
                                            </div>
                                        </Link>
                                ))
                            }
                        </div>
                        <Link className='d-flex justify-content-center text-center text-decoration-none text-dark'>
                            <div className='border rounded-5 p-1 mb-5' style={{ width: "70px" }}>
                                Load
                            </div>
                        </Link>
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

export default News