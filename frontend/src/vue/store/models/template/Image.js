import {_Draggable} from './_Draggable';


class Image extends _Draggable {
    constructor(image) {
        super(image);
        this.type = 'image';
        this.required = false;
        this.src = image ? image.src : 'image-placeholder.png';
    }

    // getters

    getSrc() {
        return config.library + 'uploads/' + this.src;
    }

    //

    toPrint() {
        let obj = {...this};
        //obj.src = config.library + 'uploads/' + this.src;
        obj.src = './../../' + 'uploads/' + this.src;
        return obj;
    }
}

export {Image};