import {_Item} from './_Item';

class _Draggable extends _Item {

    constructor(item) {
        super(item);

        this.draggable = true;
        this.styleable = true;

        this.x = item.x;
        this.y = item.y;
        this.width = item.width;
        this.height = item.height;
        this.page = item.page;
        this.padding = item.padding;
        this.background = item.background;
    }
}



export {_Draggable};