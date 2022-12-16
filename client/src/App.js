import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
//Toast Container
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//Components
import { Navbar, Footer } from "./components"
import { AuthContext } from './context/AuthContext';
//UserInterface Pages
import { Home, About, Register, Login } from "./pages/userInterface"

const App = () => {

    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios.get("http://localhost:3001/auth", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false });
            } else {
                setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    status: true,
                });
            }
        });
    }, []);

    console.log(authState);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <Router>
                    <ToastContainer />

                    <Routes>

                        <Route path="/" element={<WithNavbar authState={authState} />}>

                            <Route path='/' element={<Home />}></Route>
                            <Route path='/biz-barada' element={<About />}></Route>

                        </Route>

                        <Route path='/agza-bolmak' element={<Register />}></Route>
                        <Route path='/giris-etmek' element={<Login />}></Route>
                    </Routes>
                </Router>
            </AuthContext.Provider>
        </>
    );
}

const WithNavbar = ({ authState }) => {
    return (
        <>
            <Navbar authState={authState} />

            <Outlet />

            <Footer />
        </>
    );
}

export default App;
