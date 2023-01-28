const express = require('express');
const { Contact } = require('../models/model');
const router = express.Router();

// HOME CONTACT UCIN

//all data GET 
router.get("/", async (req, res) => {
    const contact = await Contact.findAll();
    res.json({
        contact: contact
    })
});

// single category GET 
router.get("/:contactId", async (req, res) => {
    const id = req.params.contactId
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            return res.json({
                contact: contact
            })
        } res.json({ error: "Teswir tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});

// create POST 
router.post("/create", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const comment = req.body.comment;
    try {
        await Contact.create({
            name: name,
            email: email,
            subject: subject,
            comment: comment
        });
        res.json({ success: "Teswir üstünlikli ugradyldy" });
    }
    catch (err) {
        console.log(err);
    }
});

// edit GET and POST 
router.get("/edit/:contactId", async (req, res) => {
    const id = req.params.contactId;
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            return res.json({
                contact: contact
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
router.post("/edit/:contactId", async (req, res) => {
    const id = req.params.contactId;
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const comment = req.body.comment;
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            contact.name = name;
            contact.email = email;
            contact.subject = subject;
            contact.comment = comment;
            contact.save();
            return res.json({ success: "Teswir üstünlikli duzedildi" });
        }
        res.json({ error: "Teswir tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST 
router.delete("/delete/:contactId", async (req, res) => {
    const id = req.params.contactId;
    try {
        const contact = await Contact.findByPk(id);
        if (contact) {
            await contact.destroy();
            return res.json({ success: "Teswir üstünlikli pozuldy" });
        }
        res.json({ error: "Teswir tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});



module.exports = router;