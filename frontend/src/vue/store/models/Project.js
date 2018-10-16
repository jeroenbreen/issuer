import {Document} from './Document'


class Project {

    constructor(project) {
        this._id = project ? project._id : '';
        this.company_id = project ? project.company_id : '';
        this.projectId = project ? project.projectId : null;
        this.title = project ? project.title : '';
        this.status = project ? project.projectStatus : 0;
        this.repository_id = project ? project.repository_id : 0;
        this.milestone_id = project ? project.milestone_id : 0;

        this.currency = project ? project.currency : 'EUR';
        this.rate = project ? project.rate : 70;
        this.hours = project ? project.hours : 0;
        this.discount = project ? project.discount : 0;

        this.user_id = project ? project.user_id : '';
        this.client_id = project ? project.client_id : '';
        this.quotations = [];
        this.invoices = [];
        this.comments = [];
        this.issues = [];
    }

    getBudget() {
        return (this.rate * this.hours - this.discount) + ' ' +  this.currency;
    }

    getDocument(type) {
        return new Document({
            type: type,
            documentId: 1,
            locked: false,
            date: new Date(),
            subject: this.title,
            userName: theStore.state.users.current.getFullName(),
            clientCompanyName: theStore.state.clients.all[0].companyName,
            clientContactName: theStore.state.clients.all[0].contactFirstName + ' ' + theStore.state.clients.all[0].contactLastName,
            clientStreet: theStore.state.clients.all[0].street,
            clientPostcode: theStore.state.clients.all[0].postcode,
            clientCity: theStore.state.clients.all[0].city,
            rate: this.rate,
            currency: this.currency,
            pages: [{}]
        })
    }
}

export {Project};