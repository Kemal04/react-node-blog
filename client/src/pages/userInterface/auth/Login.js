import React, { useContext, useState } from 'react'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from "../../../context/AuthContext";
import axios from 'axios';
import { useCookies } from 'react-cookie'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setAuthState } = useContext(AuthContext);

    const [cookies, setCookie] = useCookies([])

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("E-mail adresiňizi ýazyň!")
        }
        else if (!password) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (password.length < 8) {
            toast.error("Açar sözüňiz 8-den uly bolmaly")
        }
        else {
            await axios.post("http://localhost:3001/auth/login", {
                email: email,
                password: password,
            }).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState(
                        {
                            email: res.data.email,
                            id: res.data.id,
                            status: true
                        }
                    );
                    setCookie('sessionToken', res.data.sessionToken)
                    navigate("/")
                    toast.success(res.data.success)
                    window.location.reload()
                }

            })
        }
    }



    return (
        <>
            <div className='auth-bg'>
                <div className='container'>
                    <form onSubmit={loginUser} className='row justify-content-center'>
                        <div className='col-lg-5'>
                            <div className='card p-5 border-0'>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" className="form-control" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                                <div className='d-flex justify-content-end mt-3'>
                                    Men hiç hili <Link to="/agza-bolmak" className='mx-2'> Agza </Link> bolmadym!
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login