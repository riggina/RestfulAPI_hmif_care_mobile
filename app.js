const express = require('express')
const mongoose = require('mongoose')

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})