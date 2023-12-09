const router = require("express").Router();
const healthController = require('../../../controller/healthController');

router.get("/", healthController);

module.exports = router;
