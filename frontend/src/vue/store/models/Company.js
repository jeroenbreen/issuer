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
    }

}

export {Company};