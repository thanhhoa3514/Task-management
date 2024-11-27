const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        // console.log("Connected to Mongo");
    } catch (error) {
        console.log(error);
    }
}
// mongoose.connect(process.env.MONGODB_URL);