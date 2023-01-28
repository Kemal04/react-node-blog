const express = require('express');
const { Ads } = require('../models/model');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddlewares");
const fs = require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
// ADMIN UCIN

// all data GET 
router.get("/", async (req, res) => {
    const ads = await Ads.findAll();
    res.json({
        ads: ads
    })
});

// single reklam_ads GET 
router.get("/:adsId", async (req, res) => {
    const id = req.params.adsId;
    try {
        const ads = await Ads.findByPk(id);
        if (ads) {
            return res.json({
                ads: ads
            })
        } res.json({ error: "Reklama tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});

// create POST

router.post("/create", isAdmin, imageUpload.upload.single("img"), async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const img = req.file.filename;
    try {
        await Ads.create({
            title: title,
            description: description,
            img: img
        });
        res.json({ success: "Reklama üstünlikli goşuldy" })
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST
router.get("/edit/:adsId", isAdmin, async (req, res) => {
    const id = req.params.adsId;
    try {
        const ads = await Ads.findByPk(id);
        if (ads) {
            return res.json({
                ads: ads
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post("/edit/:adsId", isAdmin, async (req, res) => {
    const id = req.params.adsId;
    const title = req.body.title;
    const description = req.body.description;
    let img = req.body.img;
    if (req.file) {
        img = req.file.filename;

        fs.unlink(".public/img/" + req.body.img, err => {
            console.log(err);
        })
    }

    try {
        const ads = await Ads.findByPk(id);
        if (ads) {
            ads.title = title;
            ads.description = description;
            ads.img = img;
            ads.save();
            return res.json({ success: "Reklama üstünlikli düzedildi" });
        }
        res.json({ error: "Reklama tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.delete("/delete/:adsId", isAdmin, async (req, res) => {
    const id = req.params.adsId;
    try {
        const ads = await Ads.findByPk(id);
        if (ads) {
            await ads.destroy();
            return res.json({ success: "Reklama üstünlikli pozuldy" });
        }
        res.json({ error: "Reklama tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;