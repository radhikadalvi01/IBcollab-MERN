const express = require('express');
const app = express();
require('./db/conn');

app.use(express.json());

app.use(require('./router/auth'))

const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server started on port 5000");
});

