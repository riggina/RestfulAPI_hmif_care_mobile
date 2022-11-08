const express = require('express');
const { Server } = require('ws');
const mongoose = require('mongoose');

const User = require('./user.js'); // Locate file

const PORT = process.env.PORT || 3000; //port for https

const server = express()
    .use((req, res) => res.send("Hello, you!"))
    .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

// TODO: Change connection
mongoose.connect('CONNECTION_MONGODB')
    .then((_) => console.log("Connected to database."))
    .catch((e) => console.log("Error:", e)); // Open MongoDB.

wss.on('connection', function(ws, req) {
    ws.on('message', message => { // If there is any message
        var datastring = message.toString();
        if(datastring.charAt(0) == "{"){ // Check if message starts with '{' to check if it's json
            datastring = datastring.replace(/\'/g, '"');
            var data = JSON.parse(datastring)
            if(data.auth == "chatappauthkey231r4"){
                // TODO: Create login function
            }
        }
    }) 
})