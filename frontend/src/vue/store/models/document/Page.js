import {HourlyLine} from "./Hourly-Line";


class Page {
    constructor(page, document) {
        this.lines = [];
        this.document = document;
        if (page && page.lines) {
            this.importLines(page.lines);
        }
    }

    importLines(lines) {
        for (let line of lines) {
            this.lines.push(new HourlyLine(line, this))
        }
    }

    addLine(type) {
        let line;
        switch (type) {
            case 'hourly':
                line = new HourlyLine(null, this);
        }
        this.lines.push(line);
    }

    // ui

    isFrontPage() {
        return this.document.pages.indexOf(this) === 0;
    }

    showTotal() {
        return this.document.getPageWithTotal() === this;
    }

    //

    toPrint(currencyFilter) {
        const clone = {...this};
        clone.lines = [];
        delete clone.document;
        for (let line of this.lines) {
            clone.lines.push(line.toPrint(currencyFilter));
        }
        return clone;
    }

    clone() {
        const clone = {...this};
        clone.lines = [];
        delete clone.document;
        for (let line of this.lines) {
            clone.lines.push(line.clone());
        }
        return clone;
    }


}

export {Page};