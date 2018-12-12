import {_NonDraggable} from './_Non-Draggable';
import contentParser from '@tools/document-properties/content-parser';
import {Tools} from '@tools/tools'



class Total extends _NonDraggable {
    constructor(total) {
        super(total);
        this.type = 'total';
        this.required = true;
        this.styleable = false;
        this.position = total.position;
        this.totalNet = total.totalNet;
        this.totalVat = total.totalVat;
        this.totalGross = total.totalGross;
        this.extraContent = total.extraContent;
    }

    toPrint(documentPropertyHandler) {
        let obj = Tools.deepclone(this);
        obj.totalNet.content = contentParser.parse(this.totalNet.content, documentPropertyHandler);
        obj.totalVat.content = contentParser.parse(this.totalVat.content, documentPropertyHandler);
        obj.totalGross.content = contentParser.parse(this.totalGross.content, documentPropertyHandler);
        return obj;
    }
}

export {Total};