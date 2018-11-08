let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Template {
    constructor(template) {
        this._id = template._id ? ObjectId(template._id) : ObjectId();
        this.company_id = template.company_id ? ObjectId(template.company_id) : ObjectId();
        this.title = String(template.title);
        this.settings = Object(template.settings);
        this.frontPage = template.frontPage;
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('templates');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

router.get('/add', function(req, res) {
    let db, collection, template;
    db = req.db;
    collection = db.get('templates');
    template = new Template(req.body);
    template.company_id = company_id;

    collection.insert(template, {}, function(error, docs){
        if(error) {
            throw error;
        }
        res.send(docs);
    });
});

router.post('/', function(req, res) {
    let db, collection, document;
    document = new Template(req.body);
    document.company_id = company_id;
    db = req.db;
    collection = db.get('templates');
    collection.insert(document, {}, function(error, docs){
        if(error) {
            throw error;
        }
        res.send(docs);
    });
});

router.put('/:id', function(req, res) {
    let db, collection, template, id;
    template = new Template(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('templates');
    collection.update(id, template, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(template);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('templates');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('document deleted');
    });
});

module.exports = router;