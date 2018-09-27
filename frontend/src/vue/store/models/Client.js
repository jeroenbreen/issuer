class Client {

    constructor(client) {
        this._id = client ? client._id : null;
        this.company_id = client ? client.company_id : '';
        this.clientId = client ? client.clientId : null;
        this.companyName = client ? client.companyName : '';
        this.contactFirstName = client ? client.contactFirstName : '';
        this.contactLastName = client ? client.contactLastName : '';
        this.street = client ? client.street : '';
        this.postcode = client ? client.postcode : '';
        this.city = client ? client.city : '';
        this.email = client ? client.email : '';
        this.telephone = client ? client.telephone : '';
        this.homepage = client ? client.homepage : '';
        this.rate = client ? client.rate : 70;
        this.info = client ? client.info : '';
    }

    getFullLabel() {
        return this.getCustomCode() + ' ' + this.companyName;
    }
}

export {Client};