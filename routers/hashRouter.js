const express = require('express');
const router = express.Router();

const { hashPassword, hashDecode } = require("../controllers/hashController");

router.post("/create_hash", hashPassword);
router.post("/hash_decode", hashDecode);

module.exports = router;