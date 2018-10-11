import {HourlyLine} from "./Hourly-Line";
import {SumLine} from "./Sum-Line";


class Page {
    constructor(page, document) {
        this.lines = [];
        this.document = document;
        if (page && page.lines) {
            this.importLines(page.lines);
        }
    }

    importLines(lines) {
        let newLine;
        for (let line of lines) {
            switch (line.type) {
                case 'sum':
                    newLine = new SumLine(line, this);
                    break;
                default:
                    newLine = new HourlyLine(line, this);
                    break;
            }
            this.lines.push(newLine)
        }
    }

    createLine(type) {
        let line;
        switch (type) {
            case 'sum':
                line = new SumLine(null, this);
                break;
            default:
                line = new HourlyLine(null, this);
                break;
        }
        this.lines.push(line);
    }

    removeLine(line) {
        let index = this.lines.indexOf(line);
        if (index > -1) {
            this.lines.splice(index, 1);
        }
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