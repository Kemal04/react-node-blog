import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const About = () => {

    const [contact, setContact] = useState({
        name: "",
        email: "",
        subject: "",
        comment: "",
    })

    const [contacts, setContacts] = useState([])

    const handleChange = (e) => {
        setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault()

        if (!contact.name) {
            toast.error("Adyňyzy ýazyň")
        }
        else if (!contact.email) {
            toast.error("E-mail adresiňizi ýazyň")
        }
        else if (!contact.subject) {
            toast.error("Temaňyzy ýazyň")
        }
        else if (!contact.comment) {
            toast.error("Teswiriňizi ýazyň")
        }
        else if (contact.comment.length < 25) {
            toast.error("Teswiriňizi 50 harpdan ybarat bolmaly")
        }
        else {
            await axios.post("http://localhost:3001/contact/create", contact)
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/")
                }).catch((error) => {
                    toast.error(error.message)
                });
        }
    }

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await axios.get('http://localhost:3001/contacts/')
                setContacts(res.data.contacts)
            } catch (err) {
                console.log(err)
            }
        }
        fetchContacts()
    }, [])

    return (
        <>
            <div className='home-bg'>
                <div className='container'>
                    <div className='row flex-column aling-items-center justify-content-start text-white'>
                        <div className='col-lg-2 text-center'>
                            <div className='rounded-5 bg-secondary text-white py-1 px-3 fw-normal mt-3'>Biz-barada</div>
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
            <div className='container my-5 p-5'>
                <div className='row align-items-center mb-5'>
                    <div className='col-lg-6 text-end'>
                        <div className='h1'>
                            Biz Barada
                        </div>
                        <p className="lh-lg my-3" style={{ textAlign: "justify" }}>
                            Ýurdumyzyň künjeklerinde, aýratyn-da, gözel paýtagtymyzyň töweregindäki dag eteklerinde el bilen döredilen ýaýlalar gök öwüsýär. Häzirki döwürde baýyrlyklar pürli we saýaly agaçlary bilen gözüňi dokundyrýar.
                            Ýurdumyzyň künjeklerinde, aýratyn-da, gözel paýtagtymyzyň töweregindäki dag eteklerinde el bilen döredilen ýaýlalar gök öwüsýär. Häzirki döwürde baýyrlyklar pürli we saýaly agaçlary bilen gözüňi dokundyrýar.
                        </p>
                        <div className=''>
                            <Link className="btn btn-dark rounded-1 px-5 py-2">Habarlaşmak</Link>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <img src='/img/cards/about-us.png' alt='img' className='img-fluid' />
                    </div>
                </div>
                <div className='row align-items-center justify-content-between my-5 py-5'>
                    <div className='col-lg-4'>
                        <div className='card py-5 px-5 rounded-4 bg-dark text-white' style={{ backgroundColor: "transparent" }}>
                            <div className='d-flex align-items-center'>
                                <img src='/img/icons/phone.svg' alt='img' style={{ width: "21px" }} />
                                <div className='ms-3'>Habarlaşmak</div>
                            </div>
                            <div className='mt-4'>
                                +993 63 29-78-77
                                <br />
                                +993 63 29-78-77
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card py-5 px-5 rounded-4 bg-dark text-white' style={{ backgroundColor: "transparent" }}>
                            <div className='d-flex align-items-center'>
                                <img src='/img/icons/mark.svg' alt='img' style={{ width: "15px" }} />
                                <div className='ms-3'>Ýerleşýän ýeri</div>
                            </div>
                            <div className='mt-4'>
                                Aşgabat ş, Magtymguly şaýoly, Türkmenistanyň TT we II instituty
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card py-5 px-5 rounded-4 bg-dark text-white' style={{ backgroundColor: "transparent" }}>
                            <div className='d-flex align-items-center'>
                                <img src='/img/icons/clock.png' alt='img' style={{ width: "25px" }} />
                                <div className='ms-3'>Habarlaşmak</div>
                            </div>
                            <div className='mt-4'>
                                +993 63 29-78-77
                                <br />
                                +993 63 29-78-77
                            </div>
                        </div>
                    </div>
                </div>
                <form className="row mt-5 align-items-center">
                    <div className='col-lg-6 mt-5'>
                        <div>
                            <iframe className="img-fluid border mt-lg-0 mt-3 shadow" style={{width: "500px", height: "400px"}}
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1523.401717566166!2d58.34870495707465!3d37.901400452990146!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9b88db95a44941de!2sSere!5e1!3m2!1sen!2sus!4v1619180690015!5m2!1sen!2sus"
                                allowFullScreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    <div className='col-lg-6 mt-5'>
                        <div className="row">
                            <div className='col-lg-12'>
                                <div className='h3 text-center mb-4'>
                                    Biz Barada
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <input onChange={handleChange} type="text" className="form-control valid rounded-0" name="name" placeholder="Doly adyňyz" aria-required="true" aria-invalid="false" required autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-md-6 mb-3">
                                <div className="form-group">
                                    <input onChange={handleChange} type="email" className="form-control error rounded-0" name="email" placeholder="Email Salgynyň" aria-required="true" aria-invalid="true" required autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <input onChange={handleChange} type="text" className="form-control valid rounded-0" name="subject" placeholder="Temaňyz" aria-required="true" aria-invalid="false" required autoComplete='off' />
                                </div>
                            </div>
                            <div className="col-md-12 mb-3">
                                <div className="form-group">
                                    <textarea onChange={handleChange} name="comment" className="form-control valid rounded-0" cols="30" rows="4" placeholder="Teswiriňiz" aria-required="true" aria-invalid="false" required></textarea>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group d-grid">
                                    <button onClick={handleClick} type="submit" className="btn btn-dark mt-3 px-5" style={{ borderRadius: "30px" }}>Ugrat</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About