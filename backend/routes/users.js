let express, router, ObjectId, company_id;
express = require('express');
ObjectId = require('mongodb').ObjectId;

router = express.Router();
company_id = ObjectId('5b94e03979f9b308ffa9c60e');


class User {
    constructor(user) {
        this._id = user._id ? ObjectId(user._id) : ObjectId();
        this.company_id = user.company_id ? ObjectId(user.company_id) : ObjectId();
        this.firstName = String(user.firstName);
        this.lastName = String(user.lastName);
        this.initials = String(user.initials);
        this.email = String(user.email);
        this.githubKey = String(user.githubKey);
        this.thumbnail = String(user.thumbnail);
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('users');
    collection.find({}, {}, function(error, docs){
        res.json(docs);
    });
});

// https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2

router.post('/', function(req, res) {
    let db, collection, user;
    user = new User(req.body);
    user.company_id = company_id;
    db = req.db;
    collection = db.get('users');
    collection.insert(user, {}, function(error, docs){
        if (error) {
            throw error;
        }
        res.send(docs);
    });
});

router.put('/:id', function(req, res) {
    let db, collection, user, id;
    user = new User(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('users');
    collection.update(id, user, (error, docs) => {
        if (error) {
            throw error;
        }
        res.send(user);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('users');
    collection.remove(id, (error, docs) => {
        if (error) {
            throw error;
        }
        res.send('user deleted');
    });
});

module.exports = router;