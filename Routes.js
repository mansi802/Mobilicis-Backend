const express = require("express");
const router = express.Router();
const { query1, query2, query3, query4, query5 } = require("./Controllers");

router.route("/filter1").get(query1);
router.route("/filter2").get(query2);
router.route("/filter3").get(query3);
router.route("/filter4").get(query4);
router.route("/filter5").get(query5);

module.exports = router;
