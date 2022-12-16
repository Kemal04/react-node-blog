import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Adyňyzy ýazyň!")
        }
        else if (!email) {
            toast.error("E-mail adresiňizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (!cPassword) {
            toast.error("Açar sözüňizi gaýtadan ýazyň!")
        }
        else if (cPassword !== password) {
            toast.error("Açar sözüňiz gabat gelenok !")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post("http://localhost:3001/auth/register", {
                name: name,
                email: email,
                password: password,
            }).then((res) => {
                navigate("/")
                toast.success(res.data)
            }).catch((res) => {
                toast.error(res.data.error)
            })
        }
    }

    return (
        <>
            <div className='auth-bg'>
                <div className='container'>
                    <form onSubmit={registerUser} className='row justify-content-center'>
                        <div className='col-lg-5'>
                            <div className='card p-5 border-0'>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} name='name' type="name" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} name='email' type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} name='password' type="password" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Confirim Password</label>
                                    <input value={cPassword} onChange={(e) => setCPassword(e.target.value)} name='cPassword' type="password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                                <div className='d-flex justify-content-end mt-3'>
                                    Men öň <Link to="/giris-etmek" className='mx-2'> Giriş </Link> etdim!
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register