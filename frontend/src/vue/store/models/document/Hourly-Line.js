import {_Line} from './_Line';

class HourlyLine extends _Line {

    constructor(line, page) {
        super(line, page);
        this.type = 'hourly';
        this.subject = line && line.subject ? line.subject : '';
        this.rate = line && line.rate ? line.rate : page.document.rate;
        this.hours = line && line.hours ? line.hours : 0;
    }

    getValue() {
        return Math.round(this.rate * this.hours * 100) / 100;
    }
}

export {HourlyLine};