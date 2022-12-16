import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='bg-dark p-5 text-white'>
            <div className="container">
                <div className="footer-text">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-4">
                            <div className="ft-about">
                                <div className="mb-2">
                                    <Link to="/" className=' text-decoration-none text-white'>
                                        <div className="h3">Logo</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="ft-newslatter">
                                <h6 className='mb-4'>Gipersalgylar</h6>
                                <p>Baş Sahypa</p>
                                <p>Biz Barada</p>
                                <p>Galereýa</p>
                                <p>Habarlaşmak</p>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="ft-contact">
                                <h6>Habarlaşmak</h6>
                                <ul className='p-0 mt-4'>
                                    <li className='mb-3'>+993 65 31-69-31</li>
                                    <li className='mb-3'>shypahanalar@gmail.com</li>
                                    <li className='mb-3'>Aşgabat ş, Magtymguly şaýoly, Türkmenistanyň TT we II instituty</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-top text-center mt-3 pt-3">
                © 2023 All Rights Reserved
            </div>
        </div>
    )
}

export default Footer