const mongoose = require("mongoose");


/*
// shortschema
Things to store for url
- long url
- short url
- code
- expire
- timestamp
- isActive
- clicks
*/

const short = new mongoose.Schema({
    longUrl: {
        type: String,
        require: true,
        unique: false
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    expire: {
        type: Date,
        required: false,
        unique: false,
    },
    isActive: {
        type: Boolean,
        required: false,
        unique: false,
        default: true,

    },
    clicks: {
        type: Number,
        required: false,
        unique: false,
        default: 0
    },
}, { timestamps: true });

const shortdb = mongoose.model("short", short);

module.exports = { shortdb };
