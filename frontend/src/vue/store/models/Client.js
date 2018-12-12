import _Updatable_Object from './_Updatable_Object'

class Client extends _Updatable_Object {

    constructor(client) {
        super(client);
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
        this.rate = client ? client.rate : 0;
        this.info = client ? client.info : '';
    }

    getFullLabel(formatter, formatSetting) {
        return this.getCustomCode(formatter, formatSetting) + ' ' + this.companyName;
    }

    getCustomCode(formatter, formatSetting) {
        return formatter(formatSetting, this.clientId);
    }
}

export {Client};