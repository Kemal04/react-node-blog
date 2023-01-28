const express = require('express');
const { SubCategory, Category, Blog } = require('../models/model');
const router = express.Router();

const { isAdmin } = require("../middlewares/authMiddlewares");

// ADMIN UCIN

// all data GET 
router.get("/", async (req, res) => {
    const subCategories = await SubCategory.findAll({ include: Category });
    res.json({
        subCategories: subCategories
    })
});

// single subCategory GET 
router.get("/:subId", async (req, res) => {
    const id = req.params.subId;
    try {
        const subCategories = await SubCategory.findByPk(id, { include: Blog });
        if (subCategories) {
            return res.json({
                subCategories: subCategories
            })
        } res.json({ error: "Bölümçe tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});

// create GET and POST
router.get("/create", isAdmin, async (req, res) => {
    try {
        const category = await Category.findAll();
        res.json({
            category: category
        });
    }
    catch (err) {
        console.log(err)
    }
});
router.post("/create", isAdmin, async (req, res) => {
    const name = req.body.name;
    const categoryId = req.body.categoryId;

    try {
        await SubCategory.create({
            name: name,
            categoryId: categoryId
        });
        res.json({ success: "Bölümçe üstünlikli goşuldy" })
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST
router.get("/edit/:subCategoryId", isAdmin, async (req, res) => {
    const id = req.params.subCategoryId;
    try {
        const subCategory = await SubCategory.findByPk(id, { include: Category });
        if (subCategory) {
            return res.json({
                subCategory: subCategory
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post("/edit/:subCategoryId", isAdmin, async (req, res) => {
    const id = req.params.subCategoryId;
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    try {
        const subCategory = await SubCategory.findByPk(id);
        if (subCategory) {
            subCategory.name = name;
            subCategory.categoryId = categoryId;
            subCategory.save();
            return res.json({ success: "Bölümçe üstünlikli düzedildi" });
        }
        res.json({ error: "Bölümçe tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.delete("/delete/:subCategoryId", isAdmin, async (req, res) => {
    const id = req.params.subCategoryId;
    try {
        const subCategory = await SubCategory.findByPk(id);
        if (subCategory) {
            await subCategory.destroy();
            return res.json({ success: "Bölümçe üstünlikli pozuldy" });
        }
        res.json({ error: "Bölümçe tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;