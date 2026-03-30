const express = require('express');
const router = express.Router();
const equipmentMethods = require('./equipmentMethods');

router.get('/get-categories', equipmentMethods.getCategories);
router.post('/add', equipmentMethods.addEquipment);
router.post('/search', equipmentMethods.searchEquipment);

module.exports = router;

module.exports.setPool = function(pool) {
    equipmentMethods.pool = pool;
};

// module.exports.displayLog = function() {
//     userController.showLog();
// };