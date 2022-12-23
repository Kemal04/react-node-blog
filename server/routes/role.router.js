const express = require('express');
const sequelize = require('../data/db');
const { Role, User } = require('../models/model');
const router = express.Router();

// all data GET 
router.get("/", async (req, res) => {
    const roles = await Role.findAll({
        attributes: {
            include: ['role.id', 'role.name', [sequelize.fn('COUNT', sequelize.col('users.id')), 'user_count']]
        },
        include: [
            { model: User }
        ],
        group: ['role.id'],
        includeIgnoreAtrributes: false
    });
    res.json({
        roles: roles
    })
});

// single reklam_ads GET 
router.get("/:roleId", async (req, res) => {
    const id = req.params.roleId;
    try {
        const roles = await Role.findByPk(id);
        const users = await roles.getUsers();
        if (roles) {
            return res.json({
                roles: roles,
                users:users
            })
        } res.json({ error: "Beyle Rol tapylmady" });
    }
    catch (err) {
        console.log(err)
    }
});

// edit GET and POST
router.get("/edit/:roleId", async (req, res) => {
    const id = req.params.roleId;
    try {
        const roles = await Role.findByPk(id);
        const users = await roles.getUsers();
        if (roles) {
            return res.json({
                roles: roles,
                users: users
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});

// edit POST
router.post("/edit/:roleId", async (req, res) => {
    const id = req.params.roleId;
    const name = req.body.name;
    try {
        const role = await Role.findByPk(id);
        if (role) {
            role.name = name;
            role.save();
            return res.json({ success: "Roll üstünlikli duzedildi" });
        }
        res.json({ error: "Roll tapylmady" });

    }
    catch (err) {
        console.log(err);
    }
});

// delete POST
router.post("/delete/:roleId", async (req, res) => {
    const id = req.params.roleId;
    try {
        const roles = await Role.findByPk(id);
        if (roles) {
            await roles.destroy();
            return res.json({ success: "Roll üstünlikli pozuldy" });
        }
        res.json({ error: "Roll tapylmady" })
    }
    catch (err) {
        console.log(err);
    }
});


module.exports = router;