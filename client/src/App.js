import React from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
//Toast Container
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
//Components
import { Navbar, Footer } from "./components"
//UserInterface Pages
import { Home, About, Register, Login } from "./pages/userInterface"

const App = () => {
    return (
        <>
            <Router>
                <ToastContainer />
                <Routes>

                    <Route path="/" element={<WithNavbar />}>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/biz-barada' element={<About />}></Route>

                        <Route path='/agza-bolmak' element={<Register />}></Route>
                        <Route path='/giris-etmek' element={<Login />}></Route>
                    </Route>

                </Routes>
            </Router>
        </>
    );
}

const WithNavbar = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
}

export default App;
