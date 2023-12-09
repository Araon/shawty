const { shortdb } = require("../models/short");
const uuv4 = require("uuid").v4;

const getAllShortURLs = async (req, res) => {
  try {
    const shortURLs = await shortdb.find();
    res.send(shortURLs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createShortURL = async (req, res) => {
  try {
    const { url } = req.body;
    const key = uuv4().substring(0, 6); // Generate a short key
    const shortURL = `https://localhost:3305/${key}`;

    const newShortURL = new shortdb({
      key,
      long_url: url,
      short_url: shortURL,
    });

    const result = await newShortURL.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const redirectToLongURL = async (req, res) => {
  try {
    const { key } = req.params;
    const shortURL = await shortdb.findOne({ key });

    if (shortURL) {
      res.redirect(302, shortURL.long_url);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllShortURLs,
  createShortURL,
  redirectToLongURL,
};
