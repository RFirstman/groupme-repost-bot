var axios = require("axios");

const { bot_id } = require("../config/index");
console.log(bot_id)

module.exports = app => {
    app.post("/callback", (req, res) => {
        console.log(req.body);

        if (req.body.group_id === bot_id) {
            axios.post("https://api.groupme.com/v3/bots/post", {
                text: "I am repost bot.",
                bot_id
            });
        }
        res.sendStatus(200);
    });
}