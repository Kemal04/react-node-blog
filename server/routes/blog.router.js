const express = require('express');
const { SubCategory, Blog } = require('../models/model');
const router = express.Router();
const fs = require('fs')
const {validateToken} = require("../middlewares/authMiddlewares");
const {isAdmin, isModerator} = require("../middlewares/roleMiddlewares");

// all data GET 
router.get("/", async (req, res) => {
    const blogs = await Blog.findAll({ include: SubCategory });
    res.json({
        blogs: blogs
    })
});

router.get("/admin", validateToken, isAdmin, async (req, res) => {
    const userId = req.user.id;
    const blogs = await Blog.findAll({
        include: SubCategory,
        where: req.user.role == 2 ? { userId: userId } : null
    });
    if (blogs) {
        return res.json({
            blogs: blogs
        });
    } else res.json({ error: "Ulgama girmediniz!" })
});

// create GET
router.get("/create", validateToken, isModerator, async (req, res) => {
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

// create POST
router.post("/create", validateToken, isModerator,  async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
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

// edit GET and POST
router.get("/edit/:blogId", validateToken, isModerator, async (req, res) => {
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

// edit POST
router.post("/edit/:blogId", validateToken, isModerator, async (req, res) => {
    const id = req.params.blogId;
    const title = req.body.title;
    const description = req.body.description;
    const img = req.body.img;
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
            return res.json({ success: "Makala üstünlikli duzedildi" });
        }
        res.json({ error: "Makala tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.delete("/delete/:blogId", async (req, res) => {
    const id = req.params.blogId;
    try {
        const blog = await Blog.findByPk(id, {where: {
            id: id,
            userId: userId
        }});
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

// single blog GET
router.get("/:blogId", async (req, res) => {
    const id = req.params.blogId
    try {
        const blog = await Blog.findByPk(id, { include: SubCategory });
        if (blog) {
            return res.json({
                blog: blog
            })
        } res.json({ error: "Blog tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});


module.exports = router;