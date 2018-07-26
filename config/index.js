if (process.env.NODE_ENV === 'production') {
	module.exports = require("./prod");
} else {
	console.log("Using dev keys.");
	module.exports = require("./dev");
}