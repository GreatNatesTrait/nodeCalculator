var express = require('express'),
    path = require('path'),
    app = express();

// Express Middleware for serving static files
app.use(express.static('public'))

app.get("/", function (req, res) {
    res.sendFile("C:/Users/MclawhornN/nodeCalculator/index.html");
});

app.post("/", function (req, res) {
    console.log(req)
});

app.listen(3000);