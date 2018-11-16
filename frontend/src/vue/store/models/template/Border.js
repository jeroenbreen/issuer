import {_Item} from './_Item';


class Border extends _Item {
    constructor(border) {
        super(border);
        this.type = 'border';
        this.color = border.color;
    }

    toPrint() {
        return {...this};
    }
}

export {Border};