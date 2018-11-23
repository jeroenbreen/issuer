import {_NonDraggable} from './_Non-Draggable';

class Total {
    constructor(total) {
        this.type = 'total';
        this.required = true;
        this.styleable = false;
        this.position = total.position;
        this.totalNet = total.totalNet;
        this.totalVat = total.totalVat;
        this.totalGross = total.totalGross;
        this.extraContent = total.extraContent;
    }
}

export {Total};