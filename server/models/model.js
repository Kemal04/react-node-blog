const { DataTypes } = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull:true
    }
});

const Category = sequelize.define("category", {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

module.exports = {
    User,Category
}