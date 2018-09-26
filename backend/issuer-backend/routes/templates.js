let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Template {
    constructor(template) {
        this._id = template._id ? ObjectId(template._id) : ObjectId();
        this.company_id = template.company_id ? ObjectId(template.company_id) : ObjectId();
        this.settings = Object(template.settings);

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

// router.get('/add', function(req, res) {
//     let db, collection;
//     db = req.db;
//     collection = db.get('templates');
//
//     const document = {
//         settings: {
//             dictionary: {
//                 invoice: 'Factuur',
//                 subject: 'Betreft',
//                 footer: 'Gelieve dit bedrag binnen vier weken over te maken onder vermelding van factuurnummer op NL 30 TRIO 033 876 7924.<br><b>Let op dit is een nieuw rekeningnummer!</b>'
//             },
//             logo: {
//                 src: 'https://office.innouveau.com/print/logo-print.png',
//                 left: 0,
//                 top: 0,
//                 width: 100
//             },
//             margin: {
//                 top: 75,
//                 right: 80,
//                 bottom: 60,
//                 left: 80
//             },
//             addresses: {
//                 borderTop: 1,
//                 top: 140
//             },
//             content: {
//                 top: 250
//             },
//             subject: {
//                 borderTop: 1,
//                 borderBottom: 1,
//             },
//             footerText: {
//                 top: 540,
//                 borderTop: 1,
//                 borderBottom: 1,
//             },
//             footerImage: {
//                 image: true,
//                 imgSrc: 'https://office.innouveau.com/print/slogan.png',
//                 width: 120,
//                 top: 590
//             },
//             official: {
//                 top: 730
//             }
//         }
//     };
//     document.company_id = company_id;
//
//     collection.insert(document, {}, function(error, docs){
//         if(error) {
//             throw error;
//         }
//         res.send(docs);
//     });
// });

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
    let db, collection, document, id;
    document = new Template(req.body);
    id = ObjectId(req.params.id);
    db = req.db;
    collection = db.get('templates');
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
    collection = db.get('templates');
    collection.remove(id, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send('document deleted');
    });
});

module.exports = router;