const router = require("express").Router();

router.use("/", require("./short.route"));

module.exports = router;