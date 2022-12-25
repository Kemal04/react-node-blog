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
import { Admin, AdminAds, AdminAdsCreate, AdminAdsEdit, AdminBlog, AdminBlogCreate, AdminBlogEdit, AdminBlogRead, AdminCategory, AdminCategoryCreate, AdminCategoryEdit, AdminContact, AdminSubCategory, AdminSubCategoryCreate, AdminSubCategoryEdit, AdminUser, AdminUserCreate, AdminUserEdit } from './pages/admin';

//Toast Container
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

    const [authState, setAuthState] = useState({
        email: "",
        id: 0,
        status: false,
    });

    useEffect(() => {
        axios.get("http://localhost:3001/auth/current_user", {
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
    }, [authState]);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>

                <Router>
                    <ToastContainer />
                    <Routes>

                        <Route path="/" element={<WithNavbar authState={authState} />}>
                            <Route path='/' element={<Home />}></Route>
                            <Route path='/tazelikler' element={<News />}></Route>
                            <Route path='/reklamalar' element={<Ads />}></Route>
                            <Route path='/biz-barada' element={<About />}></Route>

                            <Route path='/kategoriya/:id' element={<CategoryRead />}></Route>

                            <Route path='/kici-kategoriya/:id' element={<SubCategoryRead />}></Route>
                            
                            <Route path='/blog/:id' element={<BlogRead />}></Route>
                        </Route>

                        <Route path="/" element={<AdminWithNavbar />}>
                            <Route path='/admin' element={<Admin />}></Route>
                            <Route path='/admin/teswirler' element={<AdminContact />}></Route>

                            <Route path='/admin/reklamalar' element={<AdminAds />}></Route>
                            <Route path='/admin/reklama-gos' element={<AdminAdsCreate />}></Route>
                            <Route path='/admin/reklama-uytget/:id' element={<AdminAdsEdit />}></Route>

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

function AdminWithNavbar() {
    return (
        <Outlet />
    );
}
export default App;
