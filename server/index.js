//Express 
const express = require('express');
const app = express();
//port
const port = 3001;

//modules
const cors = require("cors");
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
//Db
const sequelize = require('./data/db');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "Blog_site",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: new SequelizeStore({
        db:sequelize
    })
}));

//Routes
const AuthRouter = require("./routes/auth.router")
const CategoryRouter = require('./routes/category.router');
const SubCategoryRouter = require('./routes/subCategory.router');
const BlogRouter = require('./routes/blog.router');
const AdsRouter = require('./routes/ads.router');
const RoleRouter = require('./routes/role.router');
const UserRouter = require('./routes/user.router');

app.use("/auth", AuthRouter);
app.use("/category", CategoryRouter);
app.use("/subCategory", SubCategoryRouter);
app.use("/blog", BlogRouter);
app.use("/ads", AdsRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);

//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})