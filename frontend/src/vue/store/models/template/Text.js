import {_Draggable} from './_Draggable';
import contentParser from '@components/document/page/item/content-parser';


class Text extends _Draggable {
    constructor(text) {
        super(text);
        this.type = 'text';
        this.required = false;
        this.content = text.content;
        this.textAlign = text.textAlign;
    }

    toPrint(documentPropertyHandler) {
        let obj = {...this};
        obj.content = contentParser.parse(this.content, documentPropertyHandler);
        return obj;
    }
}

export {Text};