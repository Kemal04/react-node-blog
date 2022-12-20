import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SubCategoryRead = () => {

    const [subCategory, setSubCategory] = useState("");
    const [blogs, setBlogs] = useState([]);

    const location = useLocation();
    const subCategoryId = location.pathname.split("/")[2];

    useEffect(() => {
        axios.get(`http://localhost:3001/subcategory/${subCategoryId}`)
            .then((res) => {
                setSubCategory(res.data.subcategory)
                setBlogs(res.data.blogs)
            })
    }, [subCategoryId])

    return (
        <div>SubCategoryRead</div>
    )
}

export default SubCategoryRead