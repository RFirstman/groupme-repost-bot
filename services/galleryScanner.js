var axios = require("axios");
var fs = require("fs");
var Path = require("path");

const { access_token } = require("../config");
const compareImages = require("./comparator");
const { getImageUrls, requestImage } = require("./imageFetcher");

/**
 * Downloads and compares the first image with the rest
 * @param {Array} imageUrls 
 */
async function processImages(imageUrls, callback) {
    let index = 0
    let paths = []
    let j = 0, numImages = 0;

    let dir = Path.resolve(__dirname, "..", "tmp");
    console.log(dir)
    if (!fs.existsSync(dir)) {
        await fs.mkdir(dir);
    }

    await Promise.all(imageUrls.map(async imgUrl => {
        return new Promise(async (resolve, reject) => {
            let path = Path.resolve(__dirname, "..", "tmp", `img${index++}.jpeg`);
            paths.push(path);

            const { data } = await requestImage(imgUrl, access_token);

            let writeStream = fs.createWriteStream(path)
            await data.pipe(writeStream).on("finish", () => {
                console.log("reading finished") 
                j += 1;
                numImages += 1
                if (j > 1) {
                    j = 1
                    console.log(paths[numImages-1])
                    compareImages(paths[0], paths[numImages - 1], (err, results) => {
                        if (err) {
                            console.log("Error comparing: ", err)
                            reject(err);
                        } else {
                            console.log(results)
                            if (results.misMatchPercentage < 20) {
                                callback(true, results.misMatchPercentage);
                            }
                        }
                        fs.unlink(paths[numImages-1])
                    });
                }
                resolve();
            })
            .on("err", () => {
                console.log("ERROR", err);
                reject(err);
            })
        })
    }));
    console.log(numImages);
    callback(false);
    fs.unlink(paths[0])
    fs.rmdir(dir)
}

module.exports = async (group_id, callback) => {
    let imageUrls = await getImageUrls(group_id, 50);

    await processImages(imageUrls, callback);
}