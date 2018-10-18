import {Page} from "./document/Page";

class Document {

    constructor(document) {
        this._id = document._id ? document._id : null;
        this.company_id = document.company_id ? document.company_id : '';
        this.project_id = document.project_id ? document.project_id : null;

        this.type = document.type;
        this.locked = document.locked;
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

        this.state = {
            currentPage: null
        };

        this.importPages(document.pages);
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

    getFormattedId(formatIdFilter, filterSetting) {
        return this.date.getFullYear() + '-' + formatIdFilter(filterSetting, this.documentId);
    }

    //

    toPrint(currencyFilter) {
        const obj = {...this};
        obj.pages = [];
        obj.total = {
            page: this.pages.indexOf(this.getPageWithTotal()),
            value: this.getTotal(),
            formattedValue: {
                net: currencyFilter(this.getTotal()),
                vat: currencyFilter(this.getTotal() * 0.21),
                total: currencyFilter(this.getTotal() * 1.21)
            }
        };
        for (let page of this.pages) {
            obj.pages.push(page.toPrint(currencyFilter));
        }
        delete obj.state;
        console.log(obj);
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