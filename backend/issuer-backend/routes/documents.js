let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Document {
    constructor(document) {
        this._id = document._id ? ObjectId(document._id) : ObjectId();
        this.company_id = document.company_id ? ObjectId(document.company_id) : ObjectId();
        this.project_id = document.project_id ? ObjectId(document.project_id) : ObjectId();
        this.documentId = document.documentId ? Number(document.documentId) : 0;
        this.type = String(document.type);
        this.locked = Boolean(document.locked);
        this.date = String(document.date);
        this.subject = String(document.subject);
        this.userName = String(document.userName);
        this.clientCompanyName = String(document.clientCompanyName);
        this.clientContactName = String(document.clientContactName);
        this.clientStreet = String(document.clientStreet);
        this.clientPostcode = String(document.clientPostcode);
        this.clientCity = String(document.clientCity);
        this.rate = Number(document.rate);
        this.currency = String(document.currency);
        this.pages = document.pages;
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('documents');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

router.post('/', function(req, res) {
    let db, collection, document;
    console.log(req.body);
    document = new Document(req.body);
    document.company_id = company_id;
    db = req.db;
    collection = db.get('documents');
    collection.find({}, {}, function(e, docs){
        let lastId = 0;
        for (let doc of docs) {
            if (doc.documentId > lastId) {
                lastId = Number(doc.documentId);
            }
        }
        lastId++;
        document.documentId = lastId;

        collection.insert(document, {}, function(error, docs){
            if(error) {
                throw error;
            }
            res.send(docs);
        });
    });
});

router.put('/:id', function(req, res) {
    let db, collection, document, id;
    document = new Document(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('documents');
    collection.update(id, document, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(document);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('documents');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('document deleted');
    });
});

module.exports = router;