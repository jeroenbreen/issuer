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
        return config.imageUploaderLocation + 'uploads/' + this.src;
    }

    //

    toPrint() {
        let obj = {...this};
        obj.src = config.imageUploaderLocation + 'uploads/' + this.src;
        return obj;
    }
}

export {Image};