const router = require("express").Router();

router.use("/", require("./health.route"));

module.exports = router;