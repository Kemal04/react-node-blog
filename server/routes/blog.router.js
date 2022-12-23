const express = require('express');
const { Category, SubCategory, Blog } = require('../models/model');
const router = express.Router();
const fs = require('fs')

//all data GET 
router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({include: SubCategory});
    res.json({
        blogs: blogs
    })
});

// create GET and POST
router.get("/create", async (req, res) => {
    try {
        const subCategory = await SubCategory.findAll();
        res.json({
            subCategory: subCategory
        });
    }
    catch (err) {
        console.log(err)
    }
});

// delete POST
router.post("/create", async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const viewed = req.body.viewed;
    const liked = req.body.liked;
    const subcategoryId = req.body.subcategoryId;
    const userId = req.body.userId;
    
    try {
        await Blog.create({
            title: title,
            description: description,
            img:img,
            viewed:viewed,
            liked:liked,
            subcategoryId:subcategoryId,
            userId:userId
        });
        res.json({success: "Makala üstünlikli goşuldy" });
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST
router.get("/edit/:blogId", async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findByPk(id, {include: SubCategory});
        if (blog) {
            return res.json({
                blog: blog
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post("/edit/:blogId", async (req, res) => {
    const id = req.params.blogId;
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
    const viewed = req.body.viewed;
    const liked = req.body.liked;
    const subcategoryId = req.body.subcategoryId;
    try {
        const blog = await Blog.findByPk(id);
        if(blog){
            blog.title = title,
            blog.description = description,
            blog.img = img,
            blog.viewed = viewed,
            blog.liked = liked,
            blog.subcategoryId = subcategoryId,
            blog.save();
            return  res.json({success: "Makala üstünlikli duzedildi" });
        }
        res.json({error: "Makala tapylmady"});
        
    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.post("/delete/:blogId", async (req, res) => {
    const id = req.params.blogId; 
    try{
        const blog = await Blog.findByPk(id);
        if(blog){
            await blog.destroy();
            return res.json({success: "Makala üstünlikli pozuldy" });
        }
        res.json({ error: "Makala tapylmady"})
    }
    catch(err){
        console.log(err);
    }
});

// single blog GET
router.get("/:blogId", async (req, res) => {
    const id = req.params.blogId
    try {
        const blog = await Blog.findByPk(id, {include: SubCategory});
        if (blog) {
            return res.json({
                blog:blog
            })
        } res.json({ error: "Blog tapylmady"});
    }
    catch (err) {
        console.log(err)
    }
});


module.exports = router;