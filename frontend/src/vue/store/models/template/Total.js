import {_NonDraggable} from './_Non-Draggable';
class Total {
    constructor(text) {
        this.type = 'total';
        this.required = true;
        this.styleable = false;
        this.content = text.content;
    }
}

export {Total};