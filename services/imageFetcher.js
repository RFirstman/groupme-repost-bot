/* Fetches image urls from a GroupMe gallery */
var axios = require("axios");

const { access_token, group_id } = require("../config");

/**
 * Fetches the URLs for num_images to download
 * @param {String} group_id 
 * @param {number} num_images
 */
async function getImageUrls(group_id, num_images) {
    let url = `https://api.groupme.com/v3/conversations/${group_id}/gallery?limit=${num_images}`

    const options = {
        url,
        headers: {
            "User-Agent": "Repost-Bot",
            'X-Access-Token': access_token
        }
    };
    
    let imageUrls = []
    let response = await axios.get(url, options);

    let { messages } = response.data.response;

    if (messages.length && messages.length > 0) {
        messages.map(msg => {
            let { url } = msg.attachments[0];
            imageUrls.push(url);
        })
    }
    
    //console.log(imageUrls)
    return imageUrls;
}

/**
 * Makes and returns a request to imgUrl
 * @param {String} imgUrl 
 * @param {String} access_token 
 */
function requestImage(imgUrl, access_token) {
    let options = {
        url: imgUrl,
        method: "GET",
        headers: {
            "User-Agent": "Repost-Bot",
            'X-Access-Token': access_token
        },
        responseType: 'stream'
    }
    return axios(options)
}

module.exports = { getImageUrls, requestImage }