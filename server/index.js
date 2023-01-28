//Express 
const express = require('express');
const app = express();
//port
const port = 3001;

//modules
const cors = require("cors");
//Db
const sequelize = require('./data/db');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('public'))

//Routes
const AuthRouter = require("./routes/auth.router")
const CategoryRouter = require('./routes/category.router');
const SubCategoryRouter = require('./routes/subCategory.router');
const ModeratorBlogRouter = require('./routes/modBlog.router');
const BlogRouter = require('./routes/blog.router');
const AdsRouter = require('./routes/ads.router');
const RoleRouter = require('./routes/role.router');
const UserRouter = require('./routes/user.router');
const ContactRouter = require('./routes/contact.router');

app.use("/auth", AuthRouter);
app.use("/category", CategoryRouter);
app.use("/subCategory", SubCategoryRouter);
app.use("/blog", BlogRouter);
app.use("/modblog", ModeratorBlogRouter);
app.use("/ads", AdsRouter);
app.use("/role", RoleRouter);
app.use("/user", UserRouter);
app.use("/contact", ContactRouter);

//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})