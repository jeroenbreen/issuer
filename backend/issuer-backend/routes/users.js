var express, router, ObjectId;
express = require('express');
ObjectId = require('mongodb').ObjectId;
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

// https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2

router.post('/', function(req, res) {
    var db, collection, user;
    user = req.body;
    user.company_id = company_id;
    db = req.db;
    collection = db.get('users');
    collection.insert(user, {}, function(error, docs){
        if(error) {
            throw error;
        }
        res.send(docs);
    });
});

router.put('/:id', function(req, res) {
    var db, collection, user, id;
    user = req.body;
    user.company_id = company_id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('users');
    collection.update(id, user, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(docs);
    });
});

router.delete('/:id', function(req, res) {
    var db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('users');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('user deleted');
    });
});

module.exports = router;