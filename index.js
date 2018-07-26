var express = require("express");
var app = express();
var bodyParser = require("body-parser");

//app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

require("./routes/callbackRoutes")(app);

port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port: ", port);
});
