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

const Category = sequelize.define("categories", {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

const Blog = sequelize.define("blog", {
    title: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull:false
    },
    img: {
        type: DataTypes.STRING,
        allowNull:false
    },
    viewed: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    liked: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
});

const Role = sequelize.define("role", {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

const SubCategory = sequelize.define("subcategory", {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
})

Category.hasMany(SubCategory, {onDelete: "cascade"});
SubCategory.belongsTo(Category);

SubCategory.hasMany(Blog, { onDelete: "cascade" });
Blog.belongsTo(SubCategory);

// Blog.belongsTo(User)
// User.hasMany(Blog);


// Role.belongsToMany(User, {through: "userRoles"});
// User.belongsToMany(Role, {through: "userRoles"});

module.exports = {
    User,Category,Blog,Role,SubCategory
}