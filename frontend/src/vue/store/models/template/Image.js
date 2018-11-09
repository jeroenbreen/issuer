import {_Item} from './_Item';


class Image extends _Item {
    constructor(image) {
        super(image);
        this.type = 'image';
        this.src = image ? image.src : '';
    }

    // getters

    getSrc() {
        return config.fromFrontend + config.templateUrl + this.src;
    }

    //

    toPrint() {
        let obj = {...this};
        obj.src = config.fromPrint + config.templateUrl + this.src;
        return obj;
    }
}

export {Image};