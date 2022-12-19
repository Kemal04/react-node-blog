const {User,Category,Blog,Role} = require("../models/model");
const bcrypt = require('bcrypt');

async function populate(){
    const count = await User.count();

    if(count == 0 ){

        const users = await User.bulkCreate([
            {name: "Kemal", email: "kemal@gmail.com", password: await bcrypt.hash("12345678",10)},
            {name: "Mergen", email: "mergen@gmail.com", password: await bcrypt.hash("12345678",10)},
            {name: "Yunus", email: "yunus@gmail.com", password: await bcrypt.hash("12345678",10)}
        ]);

        const roles = await Role.bulkCreate([
            {name: "admin"},
            {name: "moderator"},
            {name: "guest"}
        ]);

        await users[0].addRole(roles[1]);
        await users[1].addRole(roles[2]);
        await users[2].addRole(roles[3]);

        const categories = await Category.bulkCreate([
            {name: "Bilim"},
            {name: "Syyasat"},
            {name: "Ykdysadyyet"}
        ]);

    }
}

populate();