import {HourlyLine} from "./Hourly-Line";


class Page {
    constructor(page) {
        this.lines = [];
        if (page.lines) {
            this.addLines(page.lines);
        }
    }

    addLines(lines) {
        for (let line of lines) {
            this.lines.push(new HourlyLine(line))
        }
    }

    addLine(type) {
        let line;
        switch (type) {
            case 'hourly':
                line = new HourlyLine();
        }
        this.lines.push(line);
    }

    clone() {
        const clone = {...this};
        clone.lines = [];
        for (let line of this.lines) {
            clone.pages.push(line.clone());
        }
        return clone;
    }


}

export {Page};