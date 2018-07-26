var express = require('express');
var router = express.Router();

/* GET userlist. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/add', function(req, res) {
    //
    res.send('todo')
});

module.exports = router;