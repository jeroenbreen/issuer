import {_Line} from './_Line';


class TextLine extends _Line {

    constructor(line, page) {
        super(line, page);
        this.type = 'text';
        this.text = line && line.text ? line.text : '';
    }
}

export {TextLine};