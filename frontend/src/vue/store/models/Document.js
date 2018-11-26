import {Page} from "./document/Page";

class Document {

    constructor(document) {
        this._id = document && document._id ? document._id : null;
        this.company_id = document && document.company_id ? document.company_id : '';
        this.project_id = document && document.project_id ? document.project_id : null;

        this.type = document && document.type ? document.type : 'invoice';
        this.locked = document && document.locked ? document.locked : false;
        this.documentId = document && document.documentId ? document.documentId : null;

        this.date = document && document.date ? new Date(document.date) : new Date();
        this.subject = document && document.subject ? document.subject : '';
        // addresses
        this.userName = document && document.userName ? document.userName : '';
        this.clientCompanyName = document && document.clientCompanyName ? document.clientCompanyName : '';
        this.clientContactName = document && document.clientContactName ? document.clientContactName : '';
        this.clientStreet = document && document.clientStreet ? document.clientStreet : '';
        this.clientPostcode = document && document.clientPostcode ? document.clientPostcode : '';
        this.clientCity = document && document.clientCity ? document.clientCity : '';

        // financial
        this.vat = 21;
        this.rate = document && document.rate ? document.rate : 0;
        this.currency = document && document.currency ? document.currency : 0;

        this.pages = [];

        this.state = {
            currentPage: null
        };

        if (document && document.pages) {
            this.importPages(document.pages);
        }
    }

    // actions

    importPages(pages) {
        for (let page of pages) {
            this.pages.push(new Page(page, this));
        }
        if (this.pages.length > 0) {
            this.state.currentPage = this.pages[0];
        }
    }

    createPage(type) {
        let page;
        switch (type) {
            default:
                page = new Page(null, this);
        }
        this.pages.push(page);
    }

    // ui

    hasLinesWithValue() {
        for (let page of this.pages) {
            if (page.hasLinesWithValue()) {
                return true;
            }
        }
        return false;
    }

    getPageWithTotal() {
        let pageWithTotal = null;
        for (let page of this.pages) {
            if (page.hasLinesWithValue()) {
                pageWithTotal = page;
            }
        }
        return pageWithTotal;
    }

    getTotal() {
        let total = 0;
        for (let page of this.pages) {
            for (let line of page.lines) {
                if (line.hasValue()) {
                    total += line.getValue();
                }
            }
        }
        return total;
    }

    getFormattedId(documentIdFormatter, documentIdFormat) {
        return this.date.getFullYear() + '-' + documentIdFormatter(documentIdFormat, this.documentId);
    }

    //

    toPrint(currencyFilter) {
        const obj = {...this};
        obj.pages = [];
        obj.total = {
            value: this.getTotal(),
            formattedValue: {
                net: currencyFilter(this.getTotal()),
                vat: currencyFilter(this.getTotal() * 0.21),
                gross: currencyFilter(this.getTotal() * 1.21)
            }
        };
        for (let page of this.pages) {
            obj.pages.push(page.toPrint(currencyFilter));
        }
        delete obj.state;
        return obj;
    }

    toBackend() {
        const obj = {...this};
        obj.pages = [];
        for (let page of this.pages) {
            obj.pages.push(page.toBackend());
        }
        delete obj.state;
        return obj;
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