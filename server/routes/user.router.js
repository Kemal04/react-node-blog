const express = require('express');
const { User, Role } = require('../models/model');
const { Op } = require("sequelize");
const router = express.Router();

// all data GET 
router.get("/", async (req, res) => {
    const users = await User.findAll({ include: Role });
    res.json({
        users: users
    })
});

// single user GET 
router.get("/:userId", async (req, res) => {
    const id = req.params.userId;
    try {
        const users = await User.findByPk(id, { include: Role });
        if (users) {
            return res.json({
                users: users
            })
        } res.json({ error: "User tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});


// edit GET and POST
router.get("/edit/:userId", async (req, res) => {
    const id = req.params.userId;
    try {
        const user = await User.findOne({
            where: { id: id },
            include: { model: Role }
        });

        const roles = await Role.findAll();

        if (user) {
            return res.json({
                user: user,
                roles: roles
            })
        } res.json({ error: "Ulanyjy tapylmady" });
    }
    catch (err) {
        console.log(err);
    }
});

// Edit POST
router.post("/edit/:userId", async (req, res) => {
    const id = req.params.userId;
    const roleId = req.body.roles;
    try {
        const user = await User.findOne({
            where: { id: id },
            include: { model: Role, attributes: ["id"] }
        });

        if (user) {
            user.roleId = roleId;
            await user.save();
            return res.json({ succes: "Ulanyjy duzedildi!!!"});
        } 
        res.json({ error: "Ulanyjy tapylmady" });
    }
    catch (err) {
        console.log(err);
    }
});


// delete POST 
router.delete("/delete/:userId", async (req, res) => {
    const id = req.params.userId; 
    try{
        const user = await User.findByPk(id);
        if(user){
            await user.destroy();
            return res.json({success: "Ulanyjy üstünlikli pozuldy" });
        }
        res.json({ error: "Ulanyjy tapylmady"})
    }
    catch(err){
        console.log(err);
    }
});


module.exports = router;