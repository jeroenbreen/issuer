class HourlyLine {

    constructor(line, page) {
        this.page = page;
        this.document = page.document;
        this.subject = line && line.subject ? line.subject : '';
        this.rate = line && line.rate ? line.rate : page.document.rate;
        this.hours = line && line.hours ? line.hours : 0;
    }

    getValue() {
        return Math.round(this.rate * this.hours * 100) / 100;
    }

    //

    toPrint(currencyFilter) {
        const clone = {...this};
        if (currencyFilter) {
            clone.value = currencyFilter(this.getValue());
        } else {
            clone.value = this.getValue();
        }
        delete clone.page;
        delete clone.document;
        return clone;
    }

    clone() {
        const clone = {...this};
        delete clone.page;
        delete clone.document;
        return clone;
    }

}

export {HourlyLine};