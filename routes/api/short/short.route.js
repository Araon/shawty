const express = require("express");
const router = express.Router();
const shortController = require('../../../controller/shortController');

// Get all short URLs
router.get("/", shortController.getAllShortURLs);

// Create a new short URL
router.post("/", shortController.createShortURL);

// Redirect to the long URL
router.get("/:code", shortController.redirectToLongURL);

module.exports = router;
