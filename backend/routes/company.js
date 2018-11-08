let express, router, ObjectId, company_id;
express = require('express');
router = express.Router();

ObjectId = require('mongodb').ObjectId;
company_id = ObjectId('5b94e03979f9b308ffa9c60e');

class Company {
    constructor(company) {
        this._id = company._id ? ObjectId(company._id) : ObjectId();
        this.name = String(company.name);
        this.address = String(company.address);
        this.postcode = String(company.postcode);
        this.city = String(company.city);
        this.bank = String(company.bank);
        this.githubHandle = String(company.githubHandle);
        this.githubKey = String(company.githubKey);
        this.coc = String(company.coc);
        this.vat = String(company.vat);

    }
}


router.put('/:id', function(req, res) {
    let db, collection, company, id;
    company = new Company(req.body);
    db = req.db;
    collection = db.get('companies');
    collection.update(company_id, company, (error, docs) => {
        if(error) {
            throw error;
        }
        res.send(company);
    });
});

module.exports = router;
