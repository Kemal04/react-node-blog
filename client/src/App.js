import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AuthContext } from './context/AuthContext';

//Routes
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

//Components
import { Navbar, Footer } from "./components"

//UserInterface Pages
import { Home, About, Register, Login, Ads, News, CategoryRead, SubCategoryRead, BlogRead } from "./pages/userInterface"

//Admin Pages
import { Admin, AdminAds, AdminAdsCreate, AdminAdsEdit, AdminAdsRead, AdminBlog, AdminBlogCreate, AdminBlogEdit, AdminBlogRead, AdminCategory, AdminCategoryCreate, AdminCategoryEdit, AdminContact, AdminContactCreate, AdminContactEdit, AdminContactRead, AdminSubCategory, AdminSubCategoryCreate, AdminSubCategoryEdit, AdminUser, AdminUserCreate, AdminUserEdit } from './pages/admin';

//Components
import { Forbiden, NotFounded } from "./pages/error"

//Toast Container
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
        role: 3,
    });

    useEffect(() => {
        axios.get("http://localhost:3001/auth/current_user", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((response) => {
            if (response.data.error) {
                setAuthState({ ...authState, status: false, role: 3 });
            } else {
                setAuthState({
                    email: response.data.email,
                    id: response.data.id,
                    status: true,
                    role: response.data.role,
                });
            }
        });
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>

                <Router>
                    <ToastContainer />
                    <Routes>

                        <Route path="/" element={<WithNavbar />}>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/tazelikler' element={<News />}></Route>
                            <Route path='/reklamalar' element={<Ads />}></Route>
                            <Route path='/biz-barada' element={<About />}></Route>

                            <Route path='/kategoriya/:id' element={<CategoryRead />}></Route>

                            <Route path='/kici-kategoriya/:id' element={<SubCategoryRead />}></Route>

                            <Route path='/blog/:id' element={<BlogRead />}></Route>
                        </Route>

                        <Route path="/" element={<AdminWithNavbar />}>
                            {
                                authState.role === 1 && (
                                    <>
                                        <Route path='/admin' element={<Admin />}></Route>

                                        <Route path='/admin/teswirler' element={<AdminContact />}></Route>
                                        <Route path='/admin/teswir-uytget/:id' element={<AdminContactEdit />}></Route>
                                        <Route path='/admin/teswir/:id' element={<AdminContactRead />}></Route>

                                        <Route path='/admin/reklamalar' element={<AdminAds />}></Route>
                                        <Route path='/admin/reklama-gos' element={<AdminAdsCreate />}></Route>
                                        <Route path='/admin/reklama-uytget/:id' element={<AdminAdsEdit />}></Route>
                                        <Route path='/admin/reklama/:id' element={<AdminAdsRead />}></Route>

                                        <Route path='/admin/ulanyjylar' element={<AdminUser />}></Route>
                                        <Route path='/admin/ulanyjy-gos' element={<AdminUserCreate />}></Route>
                                        <Route path='/admin/ulanyjy-uytget/:id' element={<AdminUserEdit />}></Route>

                                        <Route path='/admin/kategoriyalar' element={<AdminCategory />}></Route>
                                        <Route path='/admin/kategoriya-gos' element={<AdminCategoryCreate />}></Route>
                                        <Route path='/admin/kategoriya-uytget/:id' element={<AdminCategoryEdit />}></Route>

                                        <Route path='/admin/kici-kategoriyalar' element={<AdminSubCategory />}></Route>
                                        <Route path='/admin/kici-kategoriya-gos' element={<AdminSubCategoryCreate />}></Route>
                                        <Route path='/admin/kici-kategoriya-uytget/:id' element={<AdminSubCategoryEdit />}></Route>

                                        <Route path='/admin/bloglar' element={<AdminBlog />}></Route>
                                        <Route path='/admin/blog-gos' element={<AdminBlogCreate />}></Route>
                                        <Route path='/admin/blog-uytget/:id' element={<AdminBlogEdit />}></Route>
                                        <Route path='/admin/blog/:id' element={<AdminBlogRead />}></Route>

                                    </>
                                )
                            }
                        </Route>

                        {
                            !authState.status && (
                                <>
                                    <Route path='/agza-bolmak' element={<Register />}></Route>
                                    <Route path='/giris-etmek' element={<Login />}></Route>
                                </>
                            )

                        }

                        <Route path='/*' element={<NotFounded />}></Route>
                        <Route path='/404' element={<NotFounded />}></Route>
                        <Route path='/403' element={<Forbiden />}></Route>
                    </Routes>
                </Router>

            </AuthContext.Provider>
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

function AdminWithNavbar() {
    return (
        <Outlet />
    );
}
export default App;
