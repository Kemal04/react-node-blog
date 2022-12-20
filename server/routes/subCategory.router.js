const express = require('express');
const { SubCategory, Category } = require('../models/model');
const router = express.Router();

// all data GET 
router.get("/", async (req, res) => {
    const subCategories = await SubCategory.findAll( {include: Category});
    res.json({
        subCategories: subCategories
    })
});

// create GET and POST
router.get("/create", async (req, res) => {
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
router.post("/create", async (req, res) => {
    const name = req.body.name;
    const categoryId = req.body.categoryId;

    try {
        await SubCategory.create({
            name: name, 
            categoryId: categoryId
        });
         res.json({success: "SubKategoriya üstünlikli goşuldy" })
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST
router.get("/edit/:subCategoryId", async (req, res) => {
    const id = req.params.subCategoryId;
    try {
        const subCategory = await SubCategory.findByPk(id, {include:Category});
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
router.post("/edit/:subCategoryId", async (req, res) => {
    const id = req.params.subCategoryId;
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    try {
        const subCategory = await SubCategory.findByPk(id);
        if(subCategory){
            subCategory.name = name;
            subCategory.categoryId = categoryId;
            subCategory.save();
            return  res.json({success: "SubKategoriya üstünlikli duzedildi" });
        }
        res.json({error: "SubKategoriya tapylmady"});
        
    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.post("/delete/:subCategoryId", async (req, res) => {
    const id = req.params.subCategoryId; 
    try{
        const subCategory = await SubCategory.findByPk(id);
        if(subCategory){
            await subCategory.destroy();
            return res.json({success: "SubKategoriya üstünlikli pozuldy" });
        }
        res.json({ error: "SubKategoriya tapylmady"})
    }
    catch(err){
        console.log(err);
    }
});


module.exports = router;