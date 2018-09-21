import theStore from "../index";

class Document {

    constructor(document) {
        this._id = document._id ? document._id : null;
        this.company_id = document.company_id ? document.company_id : '';
        this.project_id = document.project_id ? document.projectId : null;

        this.type = document.type;
        this.date = new Date(document.date);
        // addresses
        this.userName = document.userName;
        this.clientCompanyName = document.clientCompanyName;
        this.clientContactName = document.clientContactName;
        this.clientStreet = document.clientStreet;
        this.clientPostcode = document.clientPostcode;
        this.clientCity = document.clientCity;
    }

}

export {Document};