const { shortdb } = require("../models/short");
const uuv4 = require("uuid").v4;
const dotenv = require('dotenv');
dotenv.config();


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

    const existingShortURL = await shortdb.findOne({ longUrl: url });

    if (existingShortURL) {
      const response = {
        key: existingShortURL.code,
        long_url: existingShortURL.longUrl,
        short_url: existingShortURL.shortUrl,
      };
      res.status(200).send(response);
      return;
    }

    const key = uuv4().substring(0, 6); // Generating a short key
    const shortURL = `${req.protocol}://${req.get('host')}/short/${key}`;

    const newShortURL = new shortdb({
      code: key,
      longUrl: url,
      shortUrl: shortURL,
    });

    const result = await newShortURL.save();

    const response = {
      key: result.code,
      long_url: result.longUrl,
      short_url: result.shortUrl,
    };

    res.status(201).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const redirectToLongURL = async (req, res) => {
  try {
    const { code } = req.params;
    const shortURL = await shortdb.findOne({ code, isActive: true });

    if (shortURL) {
      shortURL.clicks = (shortURL.clicks || 0) + 1;
      await shortURL.save();
      res.redirect(302, shortURL.longUrl);
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
