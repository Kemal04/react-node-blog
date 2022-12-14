import React from 'react'
import './Home.css'

const Home = () => {
    return (
        <>
            <div className='home-bg'>
                <div className='container'>
                    <div className='row flex-column aling-items-center justify-content-start text-white'>
                        <div className='col-lg-1 text-center'>
                            <div className='rounded-5 bg-secondary text-white py-1 px-3 fw-normal mt-3'>Sport</div>
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
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div className='row align-items-center'>
                            <div className='col-lg-3'>
                                Categories
                            </div>
                            <div className='col-lg-9'>
                                <ul class="nav justify-content-end">
                                    <li class="nav-item small mx-1">
                                        <a class="nav-link rounded-5 py-1 px-3 text-dark bg-light">Hemmesi</a>
                                    </li>
                                    <li class="nav-item small mx-1">
                                        <a class="nav-link rounded-5 py-1 px-3 text-dark" style={{ backgroundColor: "#ededed" }}>Sport</a>
                                    </li>
                                    <li class="nav-item small mx-1">
                                        <a class="nav-link rounded-5 py-1 px-3 text-dark" style={{ backgroundColor: "#ededed" }}>Saglyk</a>
                                    </li>
                                    <li class="nav-item small mx-1">
                                        <a class="nav-link rounded-5 py-1 px-3 text-dark" style={{ backgroundColor: "#ededed" }}>Biznes</a>
                                    </li>
                                    <li class="nav-item small mx-1">
                                        <a class="nav-link rounded-5 py-1 px-3 text-dark" style={{ backgroundColor: "#ededed" }}>DÜnýäde</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='row mt-4'>
                            
                        </div>
                    </div>
                    <div className='col-lg-3'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home