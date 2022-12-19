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

//Routes
const AuthRouter = require("./routes/auth.router")
const CategoryRouter = require('./routes/category.router');
const SubCategoryRouter = require('./routes/subCategory.router')

app.use("/auth", AuthRouter);
app.use("/category", CategoryRouter);
app.use("/subCategory", SubCategoryRouter);



//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})