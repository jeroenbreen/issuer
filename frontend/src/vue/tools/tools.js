class Tools {
    constructor() {}

    static deepclone(obj) {
        let newObj = {};

        if (typeof obj === 'object') {
            for (let key in obj) {
                let property = obj[key],
                    type = typeof property;
                switch (type) {
                    case 'object':
                        if( Object.prototype.toString.call( property ) === '[object Array]' ) {
                            newObj[key] = [];
                            for (let item of property) {
                                newObj[key].push(this.deepclone(item))
                            }
                        } else {
                            newObj[key] = this.deepclone(property);
                        }
                        break;
                    default:
                        newObj[key] = property;
                        break;

                }
            }
            return newObj
        } else {
            return obj;
        }
    }
}

export {Tools};

    function deepclone(obj) {
        let newObj = {};

        if (typeof obj === 'object') {
            for (let key in obj) {
                let property = obj[key],
                    type = typeof property;
                switch (type) {
                    case 'object':
                        if( Object.prototype.toString.call( property ) === '[object Array]' ) {
                            newObj[key] = [];
                            for (let item of property) {
                                newObj[key].push(this.deepclone(item))
                            }
                        } else {
                            newObj[key] = deepclone(property);
                        }
                        break;
                    default:
                        newObj[key] = property;
                        break;

                }
            }
            return newObj
        } else {
            return obj;
        }
    }