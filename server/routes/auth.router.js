const express = require('express');
const { User, Role } = require('../models/model');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { isAdmin } = require('../middlewares/AuthMiddlewares');

//register_post
router.post("/register", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user) {
            return res.json({ error: "Email on ulanylyp dur" })
        }
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            roleId: "3",
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
            
            const accessToken = sign(
                { email: user.email, id: user.id, role: user.roleId },
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
router.get("/current_user", async (req, res) => {
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