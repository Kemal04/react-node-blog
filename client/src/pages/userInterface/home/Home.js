import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import axios from "axios"

const Home = () => {

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

    return (
        <>
            <div className='home-bg'>
                <div className='container'>
                    <div className='row flex-column aling-items-center justify-content-start text-white'>
                        <div className='col-lg-2 text-center'>
                            <div className='rounded-5 bg-secondary text-white py-1 px-3 fw-normal mt-3'>Baş sahypa</div>
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
                        <div className='row align-items-center me-4'>
                            <div className='col-lg-3'>
                                <div className='fw-bold h5'>Categories</div>
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
                        <div className='row mt-5'>
                            <div className='col-lg-12'>
                                <div className="card mb-3 border-0 rounded-3 me-4 shadow">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-md-4">
                                            <img src="/img/cards/1.jpg" className="img-fluid rounded-0" alt="card" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</h5>
                                                <p className="card-text my-3">Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened...</p>
                                                <small><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 mt-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/2.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <h5 className="card-title">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</h5>
                                        <p className="card-text my-3">Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened...</p>
                                        <small><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></small>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 mt-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/3.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <h5 className="card-title">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</h5>
                                        <p className="card-text my-3">Pick the yellow peach that looks like a sunset with its red, orange, and pink coat skin, peel it off with your teeth. Sink them into unripened...</p>
                                        <small><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-5 fw-bold h5'>
                            Most Popular Videos
                        </div>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <div className='bg-dark text-white me-4 rounded-3'>
                                    <div className='row justify-content-between text-center align-items-center'>
                                        <div className='col-lg-8'>
                                            <div className="tab-content" id="v-pills-tabContent">
                                                <div className="tab-pane fade active show" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex="0">
                                                    <img src="/img/cards/1.jpg" alt="video-img" className='img-fluid' style={{ height: "400px" }} />
                                                </div>
                                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                                                    <img src="/img/cards/2.jpg" alt="video-img" className='img-fluid' style={{ height: "400px" }} />
                                                </div>
                                                <div className="tab-pane fade" id="v-pills-disabled" role="tabpanel" aria-labelledby="v-pills-disabled-tab" tabIndex="0">
                                                    <img src="/img/cards/3.jpg" alt="video-img" className='img-fluid' style={{ height: "400px" }} />
                                                </div>
                                                <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                                                    <img src="/img/cards/1.jpg" alt="video-img" className='img-fluid' style={{ height: "400px" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-4' style={{ fontSize: "14px" }}>
                                            <div className="d-flex">
                                                <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <div className="text-white" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                                                        <div className="card mb-3 border-0 mt-1" style={{ backgroundColor: "transparent" }}>
                                                            <div className="row g-0 align-items-center">
                                                                <div className="col-md-4">
                                                                    <img src="/img/video-img/1.jpg" className="img-fluid rounded-circle active-img shadow-lg" alt="video-img" />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body p-2 text-start">
                                                                        <p className="card-text small mb-1">How Did van Gogh’s Turbulent Mind</p>
                                                                        <p className="card-text small text-muted">1.2M views</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-white" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                                                        <div className="card mb-3 border-0 mt-1" style={{ backgroundColor: "transparent" }}>
                                                            <div className="row g-0 align-items-center">
                                                                <div className="col-md-4">
                                                                    <img src="/img/video-img/2.jpg" className="img-fluid rounded-circle" alt="video-img" />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body p-2 text-start">
                                                                        <p className="card-text small mb-1">How Did van Gogh’s Turbulent Mind</p>
                                                                        <p className="card-text small text-muted">1.2M views</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-white" id="v-pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#v-pills-disabled" type="button" role="tab" aria-controls="v-pills-disabled" aria-selected="false">
                                                        <div className="card mb-3 border-0 mt-1" style={{ backgroundColor: "transparent" }}>
                                                            <div className="row g-0 align-items-center">
                                                                <div className="col-md-4">
                                                                    <img src="/img/video-img/3.jpg" className="img-fluid rounded-circle" alt="video-img" />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body p-2 text-start">
                                                                        <p className="card-text small mb-1">How Did van Gogh’s Turbulent Mind</p>
                                                                        <p className="card-text small text-muted">1.2M views</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-white" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                                                        <div className="card mb-3 border-0 mt-1" style={{ backgroundColor: "transparent" }}>
                                                            <div className="row g-0 align-items-center">
                                                                <div className="col-md-4">
                                                                    <img src="/img/video-img/4.jpg" className="img-fluid rounded-circle" alt="video-img" />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    <div className="card-body p-2 text-start">
                                                                        <p className="card-text small mb-1">How Did van Gogh’s Turbulent Mind</p>
                                                                        <p className="card-text small text-muted">1.2M views</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-5 fw-bold h5'>
                            Most Popular Videos
                        </div>
                        <div className='row mb-5 pb-5'>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/1.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                    <img src="/img/cards/2.jpg" className="card-img-top rounded-0" alt="card" />
                                </div>
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/3.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/3.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                    <img src="/img/cards/1.jpg" className="card-img-top rounded-0" alt="card" />
                                </div>
                            </div>
                            <div className='col-lg-4 mb-4'>
                                <div className="card border-0 rounded-3 me-4 shadow">
                                    <img src="/img/cards/2.jpg" className="card-img-top rounded-0" alt="card" />
                                    <div className="card-body">
                                        <div className="card-title fw-bold">How Did van Gogh’s Turbulent Mind Depict One of the Most Complex Concepts in Physics?</div>
                                        <div style={{ fontSize: "13px" }} className="mt-3"><Link to="/" className='text-decoration-none text-dark fw-bold'>Kemal </Link><span>Sep 29, 2022 at 9:48 am</span></div>
                                    </div>
                                </div>
                            </div>
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

export default Home