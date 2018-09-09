var express = require('express');
var router = express.Router();

var company_id = 1;

// https://stackoverflow.com/questions/43592826/how-to-return-multiple-mongodb-collections-in-one-app-get-request
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/', function(req, res) {
    var response = {};
    var db = req.db;

    var collectionCompany = db.get('companies');
    var collectionUsers = db.get('users');
    var collectionProjects = db.get('projects');

    collectionCompany.find({id: company_id},{},function(e,docs){
        if (docs.length > 0) {
            response.company = docs[0];

            collectionUsers.find({company_id: company_id},{},function(e,docs){
                response.users = docs;

                collectionProjects.find({company_id: company_id},{},function(e,docs){
                    response.projects = docs;
                    res.json(response);
                });
            });
        }


    });




});

module.exports = router;