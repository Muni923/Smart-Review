const express = require('express');
const router = express.Router();

const Ai = require('../controller/ai-controller');

router.post('/review', Ai);
module.exports = router;