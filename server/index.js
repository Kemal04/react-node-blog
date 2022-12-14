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


app.use("/auth", AuthRouter);



//serv
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})