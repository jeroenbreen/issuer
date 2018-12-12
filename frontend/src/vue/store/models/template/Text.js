import {_Draggable} from './_Draggable';
import contentParser from '@tools/document-properties/content-parser';


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