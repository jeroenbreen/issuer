var express = require('express');
var router = express.Router();

// https://stackoverflow.com/questions/43592826/how-to-return-multiple-mongodb-collections-in-one-app-get-request
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
router.get('/', function(req, res) {
    var response = {};
    var db = req.db;
    var collectionUsers = db.get('users');
    var collectionProjects = db.get('projects');
    collectionUsers.find({},{},function(e,docs){
        response.users = docs;

        collectionProjects.find({},{},function(e,docs){
            response.projects = docs;
            res.json(response);
        });
    });
});

module.exports = router;