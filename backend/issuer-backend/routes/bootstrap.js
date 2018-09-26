let express = require('express');
let router = express.Router();
ObjectId = require('mongodb').ObjectId;
let company_id = ObjectId('5b94e03979f9b308ffa9c60e');

// TODO
// https://stackoverflow.com/questions/43592826/how-to-return-multiple-mongodb-collections-in-one-app-get-request
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/', function(req, res) {
    let response, db,
        collectionCompany, collectionUsers, collectionClients, collectionProjects, collectionTemplates;
    response = {};
    db = req.db;

    collectionCompany = db.get('companies');
    collectionUsers = db.get('users');
    collectionClients = db.get('clients');
    collectionProjects = db.get('projects');
    collectionTemplates = db.get('templates');

    collectionCompany.find({_id: company_id}, {}, function(e, docs){
        if (docs.length > 0) {
            response.company = docs[0];

            collectionUsers.find({company_id: company_id}, {}, function(e, docs){
                response.users = docs;

                collectionClients.find({company_id: company_id}, {}, function(e, docs){
                    response.clients = docs;

                    collectionProjects.find({company_id: company_id}, {}, function(e, docs){
                        response.projects = docs;

                        collectionTemplates.find({company_id: company_id}, {}, function(e, docs){
                            response.templates = docs;

                            res.json(response);
                        });
                    });
                });
            });
        }
    });
});

module.exports = router;