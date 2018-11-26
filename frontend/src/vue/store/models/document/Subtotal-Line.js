import {_Line} from './_Line';

class SubtotalLine extends _Line {

    constructor(line, page) {
        super(line, page);
        this.type = 'subtotal';
    }

    getValue(pct) {
        let prev, value;
        prev = this.prev();
        value = 0;
        while (prev && prev.type !== 'subtotal') {
            if (prev.hasValue()) {
                value += prev.getValue();
            }
            prev = prev.prev();
        }
        if (!pct) {
            pct = 100;
        }
        return Math.round(value * pct) / 100;
    }

    toPrint(currencyFilter) {
        const obj = {...this};
        if (currencyFilter) {
            obj.value = currencyFilter(this.getValue(100));
        } else {
            obj.value = this.getValue(100);
        }
        delete obj.page;
        delete obj.document;
        return obj;
    }
}

export {SubtotalLine};