import {Page} from "./document/Page";

class Document {

    constructor(document) {
        this._id = document._id ? document._id : null;
        this.company_id = document.company_id ? document.company_id : '';
        this.project_id = document.project_id ? document.projectId : null;

        this.type = document.type;
        this.documentId = document.documentId ? document.documentId : null;

        this.date = new Date(document.date);
        this.subject = document.subject;
        // addresses
        this.userName = document.userName;
        this.clientCompanyName = document.clientCompanyName;
        this.clientContactName = document.clientContactName;
        this.clientStreet = document.clientStreet;
        this.clientPostcode = document.clientPostcode;
        this.clientCity = document.clientCity;

        // financial
        this.rate = document.rate;
        this.currency = document.currency;

        this.pages = [];
        this.importPages(document.pages);
    }

    importPages(pages) {
        for (let page of pages) {
            this.pages.push(new Page(page, this));
        }
    }

    addPage(type) {
        let page;
        switch (type) {
            case 'regular':
                page = new Page(null, this);
        }
        this.pages.push(page);
    }

    // ui

    getPageWithTotal() {
        let pageWithTotal = null;
        for (let page of this.pages) {
            if (page.lines.length > 0) {
                pageWithTotal = page;
            }
        }
        return pageWithTotal;
    }

    getTotal() {
        let total = 0;
        for (let page of this.pages) {
            for (let line of page.lines) {
                total += line.getValue();
            }
        }
        return total;
    }

    //

    toPrint(currencyFilter) {
        const clone = {...this};
        clone.pages = [];
        clone.total = {
            page: this.pages.indexOf(this.getPageWithTotal()),
            value: this.getTotal(),
            formattedValue: {
                net: currencyFilter(this.getTotal()),
                vat: currencyFilter(this.getTotal() * 0.21),
                total: currencyFilter(this.getTotal() * 1.21)
            }
        };
        for (let page of this.pages) {
            clone.pages.push(page.toPrint(currencyFilter));
        }
        return clone;
    }

    clone() {
        const clone = {...this};
        clone.pages = [];
        for (let page of this.pages) {
            clone.pages.push(page.clone());
        }
        return clone;
    }

}

export {Document};