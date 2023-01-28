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
        allowNull: true
    }
});


const Category = sequelize.define("categories", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Blog = sequelize.define("blog", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    },
    viewed: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    liked: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

const Role = sequelize.define("role", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const SubCategory = sequelize.define("subcategory", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Ads = sequelize.define("ads", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

const Contact = sequelize.define("contact", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    check: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0"
    }
});



User.findOrCreate({ where: { name: "Admin", email: "admin@gmail.com", password: "$2b$10$.2s8SLEln9Dnql5sPuvtfec93qtcKyvMAqDY8zeLg8IcndoHNtXWS", roleId: "1" } });


Category.hasMany(SubCategory, { onDelete: "cascade" });
SubCategory.belongsTo(Category);

SubCategory.hasMany(Blog, { onDelete: "cascade" });
Blog.belongsTo(SubCategory);

Blog.belongsTo(User, { foreignKey: { allowNull: true } });
User.hasMany(Blog);

Role.hasMany(User, { onDelete: "cascade" });
User.belongsTo(Role);


module.exports = {
    User,
    Category,
    Blog,
    Role,
    SubCategory,
    Ads,
    Contact
}