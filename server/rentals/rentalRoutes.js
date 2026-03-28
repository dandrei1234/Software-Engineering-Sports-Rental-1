const express = require('express');
const router = express.Router();
const rentalMethods = require('./rentalMethods');

router.get('/view', rentalMethods.viewSummary);

module.exports = router;

module.exports.setPool = function(pool) {
    rentalMethods.pool = pool;
};

// module.exports.displayLog = function() {
//     userController.showLog();
// };