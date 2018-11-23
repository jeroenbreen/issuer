import {_Draggable} from './_Draggable';


class Text extends _Draggable {
    constructor(text) {
        super(text);
        this.type = 'text';
        this.required = false;
        this.content = text.content;
        this.textAlign = text.textAlign;
    }
}

export {Text};