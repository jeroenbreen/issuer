class HourlyLine {

    constructor(line) {
        this.subject = line ? line.subject : '';
        this.rate = line ? line.rate : 70;
        this.hours = line ? line.hours : 0;
    }

    getValue() {
        return Math.round(this.rate * this.hours * 100) / 100;
    }

    clone() {
        return {...this};
    }

}

export {HourlyLine};