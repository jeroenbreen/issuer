import {_Item} from './_Item';

class _NonDraggable extends _Item {

    constructor(item) {
        super(item);
        this.draggable = false;
    }
}



export {_NonDraggable};