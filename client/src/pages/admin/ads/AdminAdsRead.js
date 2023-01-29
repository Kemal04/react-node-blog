import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import AdminNavbar from '../../../components/admin/AdminNavbar'
import Sidebar from '../../../components/admin/Sidebar'

const AdminAdsRead = () => {

    const [ads, setAds] = useState("")

    const location = useLocation();
    const adsId = location.pathname.split("/")[3];

    useEffect(() => {
        axios.get(`http://localhost:3001/ads/${adsId}`).then((res) => {
            setAds(res.data.ads)
        }).catch((err) => {
            toast.error(err.message)
        })
    }, [adsId])

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
                                    <div className='col-lg-8'>
                                        <div className='card rounded-0'>
                                            <img src={`http://localhost:3001/img/${ads.img}`} alt='' className='img-fluid' />
                                            <div className='card-body'>
                                                <div className='card-title h4'>{ads.title}</div>
                                                <div className='card-text mt-5'>{ads.description}</div>
                                            </div>
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

export default AdminAdsRead