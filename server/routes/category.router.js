const express = require('express');
const { Category, SubCategory } = require('../models/model');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddlewares");

// ADMIN UCIN

//all data GET 
router.get("/", async (req, res) => {
    const categories = await Category.findAll();
    res.json({
        categories: categories
    })
});

// single category GET 
router.get("/:categoryId", async (req, res) => {
    const id = req.params.categoryId
    try {
        const category = await Category.findByPk(id, { include: SubCategory });
        if (category) {
            return res.json({
                category: category
            })
        } res.json({ error: "Kategory tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});

// create POST 
router.post("/create", isAdmin, async (req, res) => {
    const name = req.body.name;

    try {
        await Category.create({ name: name });
        res.json({ success: "Kategoriya üstünlikli goşuldy" })
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST 
router.get("/edit/:categoryId", isAdmin, async (req, res) => {
    const id = req.params.categoryId;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            return res.json({
                category: category
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post("/edit/:categoryId", isAdmin, async (req, res) => {
    const id = req.params.categoryId;
    const name = req.body.name;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            category.name = name;
            category.save();
            return res.json({ success: "Kategoriya üstünlikli duzedildi" });
        }
        res.json({ error: "Kategoriya tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST 
router.delete("/delete/:categoryId", isAdmin, async (req, res) => {
    const id = req.params.categoryId;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            await category.destroy();
            return res.json({ success: "Kategoriya üstünlikli pozuldy" });
        }
        res.json({ error: "Kategoriya tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});



module.exports = router;