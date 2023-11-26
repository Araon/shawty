const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/urlshortner", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log("ERROR:", err.message);
    });

// todoschema
const short = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: false,
    },
    longUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: false,
    },
    creationTime: {
        type: String,
        default: Date.now,
        required: false,
    },
    lastUpdated: {
        type: String,
        default: Date.now,
        required: false,
    },
    updatedBy: {
        type: String,
        required: false,
        defualt: "System",
    },
});

const shortdb = mongoose.model("short", short);

module.exports = { shortdb };
