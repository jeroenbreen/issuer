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
            if (prev.type === 'hourly' || prev.type === 'sum') {
                value += prev.getValue();
            }
            prev = prev.prev();
        }
        if (!pct) {
            pct = 100;
        }
        return Math.round(value * pct) / 100;
    }
}

export {SubtotalLine};