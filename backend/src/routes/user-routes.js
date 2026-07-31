const express = require('express');
const router = express.Router();

const { Signup, Login } = require('../controller/user-controller');

router.use('/signup', Signup);
router.use('/login', Login);

module.exports = router;