const express = require('express');
const router = express.Router();
const userMethods = require('./userMethods');

router.post('/login', userMethods.login);
router.post('/register', userMethods.signUp);

module.exports = router;

module.exports.setPool = function(pool) {
    userMethods.pool = pool;
};