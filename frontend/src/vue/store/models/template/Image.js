import {_Item} from './_Item';


class Image extends _Item {
    constructor(image) {
        super(image);
        this.type = 'image';
        this.src = image.src;
    }
}

export {Image};