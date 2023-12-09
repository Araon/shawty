const mongoose = require("mongoose");

// shortschema
/*
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
        required: true,
        unique: true,
        default: 1,

    },
    clicks: {
        type: Number,
        required: true,
        unique: false,
    },
}, { timestamps: true });

const shortdb = mongoose.model("short", short);

module.exports = { shortdb };
