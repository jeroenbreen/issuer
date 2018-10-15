import {HourlyLine} from "./Hourly-Line";
import {SumLine} from "./Sum-Line";
import {SubtotalLine} from "./Subtotal-Line";
import {TextLine} from "./Text-Line";
import {BreakLine} from "./Break-Line";


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
            newLine = this._getLineType(line, line.type);
            this.lines.push(newLine)
        }
    }

    createLine(type) {
        let line = this._getLineType(null, type);
        this.lines.push(line);
    }

    _getLineType(line, type) {
        switch (type) {
            case 'sum':
                return new SumLine(line, this);
            case 'subtotal':
                return new SubtotalLine(line, this);
            case 'text':
                return new TextLine(line, this);
            case 'break':
                return new BreakLine(line, this);
            default:
                return new HourlyLine(line, this);
        }
    }

    removeLine(line) {
        let index = this.lines.indexOf(line);
        if (index > -1) {
            this.lines.splice(index, 1);
        }
    }

    prev() {
        let index = this.document.pages.indexOf(this);
        if (index > 0) {
            return this.document.pages[index - 1];
        } else {
            return null;
        }
    }

    // ui

    hasLinesWithValue() {
        for (let line of this.lines) {
            if (line.hasValue()) {
                return true;
            }
        }
        return false;
    }

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