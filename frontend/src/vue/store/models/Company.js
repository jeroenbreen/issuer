class Company {

    constructor(company) {
        this._id = company ? company._id : '';
        this.name = company ? company.name : '';
        this.address = company ? company.address : '';
        this.postcode = company ? company.postcode : '';
        this.city = company ? company.city : '';
        this.bank = company ? company.bank : '';
        this.coc = company ? company.coc : '';
        this.vat = company ? company.vat : '';
    }

    getCustomCode() {
        switch (window.settings.documentIdFormat) {
            case '3zeros':
                let s = String(this.clientId);
                while (s.length < (3 || 2)) {s = "0" + s;}
                return s;
        }
    }

    toBackend() {
        return {...this};
    }

}

export {Company};