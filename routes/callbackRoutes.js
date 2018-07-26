var curl = require("curlrequest");

const { bot_id, group_id } = require("../config/index");
const galleryScanner = require("../services/galleryScanner");

module.exports = app => {
    app.post("/callback", (req, res) => {
        console.log(req.body);

        if (req.body.sender_type != "bot") {
            let { attachments } = req.body;
            if (attachments.length > 0) {
                galleryScanner(attachments[0], req.body.group_id);
            }

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