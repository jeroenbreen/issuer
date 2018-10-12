import {_Line} from './_Line';


class SumLine extends _Line {

    constructor(line, page) {
        super(line, page);
        this.type = 'sum';
        this.subject = line && line.subject ? line.subject : '';
        this.value = line && line.value ? line.value : 0;
    }

    getValue() {
        return Math.round(this.value * 100) / 100;
    }
}

export {SumLine};