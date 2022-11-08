const express = require("express");

var app = express();

app.get("/", function(req,res){
    res.send("hello");
})

app.listen(5000, function(){
    console.log("Started application on port %d",5000);
});