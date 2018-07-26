var curl = require("curlrequest");

const { bot_id, group_id } = require("../config/index");
console.log(bot_id)

module.exports = app => {
    app.post("/callback", (req, res) => {
        console.log(req.body);

        if (req.body.group_id === group_id) {
            axios.post("https://api.groupme.com/v3/bots/post", {
                text: "I am repost bot.",
                bot_id
            });
        }
        res.sendStatus(200);
    });
}