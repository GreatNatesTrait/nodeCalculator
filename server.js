var express = require('express'),
    path = require('path'),
    app = express();

app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.listen(3000);