//Express 

const express = require('express');
const app = express();
const port = 3001;

const sequelize = require('./data/db');


app.listen(port, () => {
    console.log(`server listening on port ${port}`);
})