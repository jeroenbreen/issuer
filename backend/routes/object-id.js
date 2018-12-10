let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;


router.get('/', function(req, res) {
    res.json(ObjectId());
});



module.exports = router;