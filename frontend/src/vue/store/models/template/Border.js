import {_Draggable} from './_Draggable';


class Border extends _Draggable {
    constructor(border) {
        super(border);
        this.type = 'border';
        this.required = false;
    }

    toPrint() {
        return {...this};
    }
}

export {Border};