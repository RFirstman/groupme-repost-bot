var curl = require("curlrequest");
var axios = require("axios");

const config = require("../config/index");
console.log(config)
let { bot_id, group_id } = config; 
console.log(bot_id, group_id)

module.exports = app => {
    app.post("/callback", (req, res) => {
        console.log(req.body);

        if (req.body.sender_type != "bot") {
            console.log("sending message")
            /* axios.post("https://api.groupme.com/v3/bots/post", {
                text: "I am repost bot.",
                bot_id
            }); */
            var options = {
                method: "POST",
                url: "https://api.groupme.com/v3/bots/post",
                data: { text: "hello!", bot_id }
            };
    
            curl.request(options, function(error, response) {
                if (error) {
                    console.log(error);
                }
            });
        }
        res.sendStatus(200);
    });
}