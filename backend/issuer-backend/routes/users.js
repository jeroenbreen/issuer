var express, router;
express = require('express');
router = express.Router();

var company_id = '5b94e03979f9b308ffa9c60e';


router.get('/', function(req, res) {
    var db, collection;
    db = req.db;
    collection = db.get('users');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/add', function(req, res) {
    // https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2
    var db, collection, user;
    user = req.body;
    user.company_id = company_id;
    db = req.db;
    collection = db.get('users');
    collection.insert(user,{},function(e, docs){
        res.send(docs);
    });

});

module.exports = router;