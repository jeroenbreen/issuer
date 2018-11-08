const company_id = '5b94e03979f9b308ffa9c60e';
const ObjectId = require('mongodb').ObjectId;


const _base = {

    // https://dev.to/ichtrojan/basic-routing-http-requests-and-crud-operation-with-express-and-mongodb-od2

    get(route, req, res) {
        var db, collection;
        db = req.db;
        collection = db.get(route);
        collection.find({}, {}, function(e, docs){
            res.json(docs);
        });
    },

    post(route, req, res) {
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
    },

    put(route, req, res) {
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
    },

    delete(route, req, res) {
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
    }
};

module.exports = _base;