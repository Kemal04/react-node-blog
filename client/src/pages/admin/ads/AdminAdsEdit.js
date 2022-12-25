import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminNavbar from '../../../components/admin/AdminNavbar';
import Sidebar from '../../../components/admin/Sidebar';

const AdminAdsEdit = () => {

    const [ads, setAds] = useState("")

    const navigate = useNavigate()
    const location = useLocation();

    const adsId = location.pathname.split("/")[3];

    const handleChange = (e) => {
        setAds((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/ads/edit/${adsId}`).then((res) => {
            setAds(res.data.ads)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [adsId])

    const handleClick = async (e) => {
        e.preventDefault()

        if (!ads.title) {
            toast.error("Adyny ýazyň")
        }
        else if (!ads.description) {
            toast.error("Mazmuny ýazyň")
        }
        else {
            await axios.post(`http://localhost:3001/ads/edit/${adsId}`, ads)
                .then((res) => {
                    toast.success(res.data.success)
                    navigate("/admin/reklamalar")
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
                                                Reklama Goşmak
                                            </div>
                                            <form className='row'>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Reklama Ady</label>
                                                    <input value={ads.title} onChange={handleChange} name='title' type="text" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label fw-bold">Reklama Suraty</label>
                                                    <input value={ads.img} onChange={handleChange} name='img' type="text" className="form-control rounded-0" autoComplete="off" />
                                                </div>

                                                <div className="col-lg-12 mb-3">
                                                    <label className="ads-label fw-bold">Reklama Mazmuny</label>
                                                    <textarea value={ads.description} onChange={handleChange} name='description' type="text" className="form-control rounded-0" rows="5" autoComplete="off"></textarea>
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

export default AdminAdsEdit