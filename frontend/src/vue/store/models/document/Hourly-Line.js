class HourlyLine {

    constructor(line, page) {
        this.page = page;
        this.subject = line && line.subject ? line.subject : '';
        this.rate = line && line.rate ? line.rate : page.document.rate;
        this.hours = line && line.hours ? line.hours : 0;
    }

    getValue() {
        return Math.round(this.rate * this.hours * 100) / 100;
    }

    clone() {
        const clone = {...this};
        delete clone.page;
        return clone;
    }

}

export {HourlyLine};