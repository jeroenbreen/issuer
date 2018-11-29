let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Project {
    constructor(project) {
        this._id = project._id ? ObjectId(project._id) : ObjectId();
        this.company_id = project.company_id ? ObjectId(project.company_id) : ObjectId();
        this.projectId = project.projectId ? Number(project.projectId) : 0;
        this.title = String(project.title);
        this.status_id = ObjectId(project.status_id);
        this.repository_id = Number(project.repository_id);
        this.milestone_id = Number(project.milestone_id);

        this.currency = String(project.currency);
        this.rate = Number(project.rate);
        this.hours = Number(project.hours);
        this.discount = Number(project.discount);

        this.user_id = project.user_id ? ObjectId(project.user_id) : ObjectId();
        this.client_id = project.client_id ? ObjectId(project.client_id) : ObjectId();
        this.quotations = [];
        this.invoices = [];
        this.comments = [];
        this.issues = [];
    }
}


router.get('/', function(req, res) {
    let db, collection;
    db = req.db;
    collection = db.get('projects');
    collection.find({}, {}, function(e, docs){
        res.json(docs);
    });
});

router.post('/', function(req, res) {
    let db, collection, project;
    project = new Project(req.body);
    project.company_id = company_id;
    db = req.db;
    collection = db.get('projects');
    collection.find({client: project.client}, {}, function(e, docs){

        console.log(docs);
        let lastId = 0;
        for (let doc of docs) {
            if (doc.projectId > lastId) {
                lastId = Number(doc.projectId);
            }
        }
        lastId++;
        project.projectId = lastId;

        collection.insert(project, {}, function(error, docs){
            if(error) {
                throw error;
            }
            res.send(docs);
        });
    });
});

router.put('/:id', function(req, res) {
    let db, collection, project, id;
    project = new Project(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('projects');
    collection.update(id, project, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(project);
    });
});

router.delete('/:id', function(req, res) {
    let db, collection, id;
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('projects');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('project deleted');
    });
});

module.exports = router;