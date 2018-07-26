var express = require("express");
var app = express();
var bodyParser = require("body-parser");

require("./routes/callbackRoutes")(app);

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log("Server running on port: ", port);
});
