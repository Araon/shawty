const router = require("express").Router();

router.use("/short", require("./short"));
router.use("/ping", require("./health"));

module.exports = router;