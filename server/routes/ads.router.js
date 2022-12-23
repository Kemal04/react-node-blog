const express = require('express');
const { Ads } = require('../models/model');
const router = express.Router();

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
        } res.json({ error: "Reklama tapylmady"});
    }
    catch (err) {
        console.log(err)
    }
});

// create POST

router.post("/create", async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;

    try {
        await Ads.create({
            title: title, 
            description: description
        });
         res.json({success: "Reklama üstünlikli goşuldy" })
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST
router.get("/edit/:adsId", async (req, res) => {
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
router.post("/edit/:adsId", async (req, res) => {
    const id = req.params.adsId;
    const title = req.body.title;
    const description = req.body.description;
    try {
        const ads = await Ads.findByPk(id);
        if(ads){
            ads.title = title;
            ads.description = description;
            ads.save();
            return  res.json({success: "Reklama üstünlikli duzedildi" });
        }
        res.json({error: "Reklama tapylmady"});
        
    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.post("/delete/:adsId", async (req, res) => {
    const id = req.params.adsId; 
    try{
        const ads = await Ads.findByPk(id);
        if(ads){
            await ads.destroy();
            return res.json({success: "Reklama üstünlikli pozuldy" });
        }
        res.json({ error: "Reklama tapylmady"})
    }
    catch(err){
        console.log(err);
    }
});


module.exports = router;