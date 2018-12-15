import {Tools} from "@tools/tools";


class _Updatable_Object {
    constructor(obj) {
        this._id = obj ? obj._id : '';
    }

    toBackend() {
        return Tools.deepclone(this);
    }

    updateAllPropertiesByClone(clone) {
        for (let key in clone) {
            this[key] = clone[key];
        }
    }
}

export default _Updatable_Object;