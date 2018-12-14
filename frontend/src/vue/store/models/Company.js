import _Updatable_Object from './_Updatable_Object'

class Company extends _Updatable_Object {

    constructor(company) {
        super(company);
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

    // action label in the history
    getActionTitle() {
        return 'your company profile';
    }
}

export {Company};