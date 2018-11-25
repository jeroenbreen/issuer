import {_Draggable} from './_Draggable';

class Lines extends _Draggable {
    constructor(lines) {
        super(lines);
        this.type = 'lines';
        this.required = true;
        this.page = lines.page;
    }
}

export {Lines};