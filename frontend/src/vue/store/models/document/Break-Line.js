import {_Line} from './_Line';


class BreakLine extends _Line {

    constructor(line, page) {
        super(line, page);
        this.type = 'break';
    }

}

export {BreakLine};