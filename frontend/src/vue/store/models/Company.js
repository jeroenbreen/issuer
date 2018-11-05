class Company {

    constructor(company) {
        this._id = company._id;
        this.name = company.name;
        this.address = company.address;
        this.postcode = company.postcode;
        this.city = company.city;
        this.bank = company.bank;
        this.githubHandle = company.githubHandle;
        this.githubKey = company.githubKey;
        this.coc = company.coc;
        this.vat = company.vat;
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