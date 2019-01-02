let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Client {
    constructor(client) {
        this._id = client._id ? ObjectId(client._id) : ObjectId();
        this.company_id = client.company_id ? ObjectId(client.company_id) : ObjectId();
        this.clientId = client.clientId ? Number(client.clientId) : 0;
        this.companyName = String(client.companyName);
        this.contactFirstName = String(client.contactFirstName);
        this.contactLastName = String(client.contactLastName);
        this.street = String(client.street);
        this.postcode = String(client.postcode);
        this.city = String(client.city);
        this.email = String(client.email);
        this.telephone = String(client.telephone);
        this.homepage = String(client.homepage);
        this.rate = Number(client.rate);
        this.info = String(client.info);
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('clients');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

router.post('/', function(req, res) {
    let db, collection, client;
    client = new Client(req.body);
    client.company_id = company_id;
    db = req.db;
    collection = db.get('clients');
    collection.insert(client, {}, function(error, docs){
        if(error) {
            throw error;
        }
        res.send(docs);
    });
});

router.put('/:id', function(req, res) {
    let db, collection, client, id;
    client = new Client(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('clients');
    collection.update(id, client, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(client);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('clients');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('client deleted');
    });
});

module.exports = router;