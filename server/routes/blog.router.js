const express = require('express');
const { SubCategory, Blog } = require('../models/model');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddlewares");
const fs = require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
// ADMIN UCIN blog

// Admin all blog data GET 
router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({ include: SubCategory });
    res.json({
        blogs: blogs
    })
});


// Admin single blog GET
router.get("/:blogId", async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findByPk(id, {
            where: { id: id },
            include: SubCategory
        });
        if (blog) {
            return res.json({
                blog: blog
            })
        } res.json({ error: "Makala tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});


// Admin ucin blog edit GET
router.get("/edit/:blogId", isAdmin, async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findByPk(id, {
            where: { id: id },
            include: SubCategory
        });
        if (blog) {
            return res.json({
                blog: blog
            });
        } else res.json({ error: "Makala tapylmady!" })
    }
    catch (err) {
        console.log(err);
    }
});


//Admin ucin blog edit POST
router.post("/edit/:blogId", isAdmin, imageUpload.upload.single("img"), async (req, res) => {
    const id = req.params.blogId;
    const title = req.body.title;
    const description = req.body.description;
    let img = req.body.img;

    if (req.file) {
        img = req.file.filename;

        fs.unlink(".public/img/" + req.body.img, err => {
            console.log(err);
        })
    }
    const viewed = req.body.viewed;
    const liked = req.body.liked;
    const subcategoryId = req.body.subcategoryId;

    try {
        const blog = await Blog.findByPk(id);
        if (blog) {
            blog.title = title,
                blog.description = description,
                blog.img = img,
                blog.viewed = viewed,
                blog.liked = liked,
                blog.subcategoryId = subcategoryId,
                blog.save();
            return res.json({ success: "Makala üstünlikli düzedildi" });
        }
        res.json({ error: "Makala tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});


// Admin ucin blog delete POST
router.delete("/delete/:blogId", isAdmin, async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findOne({
            where: { id: id }
        });
        if (blog) {
            await blog.destroy();
            return res.json({ success: "Makala üstünlikli pozuldy" });
        }
        res.json({ error: "Makala tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;