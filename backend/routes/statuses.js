let express, router, ObjectId, company_id;
express = require('express');
ObjectId = require('mongodb').ObjectId;

router = express.Router();
company_id = ObjectId('5b94e03979f9b308ffa9c60e');


class Status {
    constructor(status) {
        this._id = status._id ? ObjectId(status._id) : ObjectId();
        this.order = Number(status.order);
        this.title = String(status.title);
        this.color = String(status.color);
        this.type = String(status.type);
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('statuses');
    collection.find({}, {}, function(error, docs){
        res.json(docs);
    });
});

// https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2

router.post('/', function(req, res) {
    let db, collection, status;
    status = new status(req.body);
    status.company_id = company_id;
    db = req.db;
    collection = db.get('statuses');
    collection.insert(status, {}, function(error, docs){
        if (error) {
            throw error;
        }
        res.send(docs);
    });
});

router.put('/:id', function(req, res) {
    let db, collection, status, id;
    status = new status(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('statuses');
    collection.update(id, status, (error, docs) => {
        if (error) {
            throw error;
        }
        res.send(status);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('statuses');
    collection.remove(id, (error, docs) => {
        if (error) {
            throw error;
        }
        res.send('status deleted');
    });
});

module.exports = router;