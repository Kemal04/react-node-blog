const express = require('express');
const { User, Role } = require('../models/model');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { validateToken } = require('../middlewares/AuthMiddlewares');

//all data get 


//register_post
router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            req.session.message = "Email on ulanylyp dur";
            return res.json({ error: "Email on ulanylyp dur" })
        }
        await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });
        res.json("Giris kabul edildi");
    }
    catch (err) {
        console.log(err);
    }
});














//login_post
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.json({ error: "email invalid" });
        }


        const match = await bcrypt.compare(password, user.password)
        if (match) {
            const UserRoles = await Role.findAll({
                where: { id: user.roleId },
                attributes: ["name"],
                raw: true
            });
            req.session.roles = UserRoles.map((role) => role["name"]);
            req.session.isAuth = true;
            req.session.username = user.name;
            req.session.roleId = user.roleId;

            const accessToken = sign(
                { email: user.email, id: user.id },
                "importantsecret"
            );
            res.json({ token: accessToken, email: email, id: user.id });
        } else {
            return res.json({ error: "password invald" })
        }
    }
    catch (err) {
        console.log(err);
    }
});































//current user
router.get("/current_user", validateToken, async (req, res) => {
    res.json(req.user)
})

//single-user
router.get("/basicinfo/:userId", async (req, res) => {
    const id = req.params.userId;

    const basicInfo = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    res.json(basicInfo);
});


module.exports = router;