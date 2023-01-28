const express = require('express');
const { SubCategory, Blog } = require('../models/model');
const router = express.Router();
const { isModerator } = require("../middlewares/authMiddlewares");
const fs = require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

// MODERATOR UCIN
router.get("/", isModerator, async (req, res) => {
    const userId = req.user.id;
    const blogs = await Blog.findAll({
        include: SubCategory,
        where: req.user.role == 2 ? { userId: userId } : null
    });
    if (blogs) {
        return res.json({
            blogs: blogs
        });
    }
});

// Moderator single blog GET
router.get("/:blogId", isModerator, async (req, res) => {
    const id = req.params.blogId;
    const userId = req.user.id;
    try {
        const blog = await Blog.findOne({
            where: {
                id: id,
                userId: userId
            },
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

// Moderator create 
router.get("/create", isModerator, async (req, res) => {
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

// Moderator create POST
router.post("/create", isModerator, imageUpload.upload.single("img"), async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const img = req.file.filename;
    const viewed = req.body.viewed;
    const liked = req.body.liked;
    const subcategoryId = req.body.subcategoryId;
    const userId = req.user.id;

    try {
        await Blog.create({
            title: title,
            description: description,
            img: img,
            viewed: viewed,
            liked: liked,
            subcategoryId: subcategoryId,
            userId: userId
        });
        res.json({ success: "Makala üstünlikli goşuldy" });
    }
    catch (err) {
        console.log(err);
    }
});

// Moderator edit GET
router.get("/edit/:blogId", isModerator, async (req, res) => {
    const id = req.params.blogId;
    const userId = req.user.id;
    try {
        const blog = await Blog.findOne({
            where: {
                id: id,
                userId: userId
            },
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


//Moderator edit POST
router.post("/edit/:blogId", isModerator, imageUpload.upload.single("img"), async (req, res) => {
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

// Moderator delete POST
router.delete("/delete/:blogId", isModerator, async (req, res) => {
    const id = req.params.blogId;
    const userId = req.user.id;
    try {
        const blog = await Blog.findOne({
            where: {
                id: id,
                userId: userId
            }
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