import {_Item} from './_Item';


class Text extends _Item {
    constructor(text) {
        super(text);
        this.type = 'text';
        this.content = text.content;
        this.textAlign = text.textAlign;
    }
}

export {Text};