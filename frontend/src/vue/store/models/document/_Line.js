class _Line {

    constructor(line, page) {
        this.page = page;
        this.document = page.document;
    }

    prev() {
        let lineIndex = this.page.lines.indexOf(this);
        if (lineIndex > 0) {
            return this.page.lines[lineIndex - 1];
        } else if (lineIndex === 0) {
            let page = this.page.prev();
            if (page) {
                if (page.lines.length > 0) {
                    return page.lines[page.lines.length - 1];
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    hasValue() {
        return this.type === 'hourly' || this.type === 'sum';
    }

    toPrint(currencyFilter) {
        const obj = {...this};
        if (this.hasValue()) {
            if (currencyFilter) {
                obj.value = currencyFilter(this.getValue());
            } else {
                obj.value = this.getValue();
            }
        }
        delete obj.page;
        delete obj.document;
        return obj;
    }

    toBackend() {
        const obj = {...this};
        delete obj.page;
        delete obj.document;
        return obj;
        return {};
    }

    clone() {
        const clone = {...this};
        delete clone.page;
        delete clone.document;
        return clone;
    }

}

export {_Line};