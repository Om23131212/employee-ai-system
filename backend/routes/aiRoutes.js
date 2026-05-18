const express = require("express");

const {
  recommend
} = require("../controllers/aiController");

const router = express.Router();

router.post("/recommend", recommend);

module.exports = router;