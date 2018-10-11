class SumLine {

    constructor(line, page) {
        this.type = 'sum';
        this.page = page;
        this.document = page.document;
        this.subject = line && line.subject ? line.subject : '';
        this.value = line && line.value ? line.value : 0;
    }

    getValue() {
        return Math.round(this.value * 100) / 100;
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

export {SumLine};