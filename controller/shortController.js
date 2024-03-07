const { Sequelize, DataTypes } = require("sequelize");
const ShortModel = require("../models/short.model")
const Short = ShortModel(Sequelize, DataTypes)
const uuv4 = require("uuid").v4;
const dotenv = require('dotenv');
dotenv.config();

const INVALID_URLS = ['localhost']

const getAllShortURLs = async (req, res) => {

  try {
    const shortURLs = await Short.findAll()
    res.send(shortURLs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createShortURL = async (req, res) => {
  try {
    const postData = req.body;
    let key;
    let insertionSuccessful = false;

    if (INVALID_URLS.includes(postData.url) || postData.url.includes('/short')) {
      return res.status(401).send('Invalid URL. Self url not allowed');
    }

    while (!insertionSuccessful) {

      // Generating a short key
      key = uuv4().substring(0, 6);

      try {
        const newShortURL = await Short.create({
          code: key,
          longUrl: postData.url,
          expire: postData.expire_at
        });

        insertionSuccessful = true;

        const response = {
          key: newShortURL.code,
          long_url: newShortURL.longUrl,
          short_url: `${req.protocol}://${req.get('host')}/short/${newShortURL.code}`,
          expire_at: newShortURL.expire
        };
        console.log('Key generated %s', key)
        res.status(201).send(response);
      } catch (insertionError) {
        console.log('Hash collison occured. Generating new key...')
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};


const getShortURLStats = async (req, res) => {
  try {
    const { code } = req.params;
    const shortURL = await Short.findOne({
      where: { code, isActive: true }
    });

    if (shortURL) {
      res.json({
        clicks: shortURL.clicks || 0,
        created_at: shortURL.created,
        expire_at: shortURL.expire,
      });
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const redirectToLongURL = async (req, res) => {
  try {
    const { code } = req.params;

    const shortURL = await Short.findOne({
      where: { code, isActive: true }
    });

    if (shortURL) {
      if (shortURL.expire && new Date(shortURL.expire) < new Date()) {
        res.status(404).send("Short URL has expired");
      } else {
        shortURL.clicks = (shortURL.clicks || 0) + 1;
        await shortURL.save();
        res.redirect(302, shortURL.longUrl);
      }
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
  getShortURLStats
};
