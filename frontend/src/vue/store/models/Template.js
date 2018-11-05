class Template {

    constructor(template) {
        this._id = template._id ? template._id : null;
        this.company_id = template.company_id ? template.company_id : '';
        this.settings = template.settings;
        this.title = template.title;
    }

    clone() {
        let obj = {...this};
        obj.settings = this.deepclone(obj.settings);
        return obj;
    }

    deepclone(obj) {
        let newObj = {};
        for (let key in obj) {
            newObj[key] = {...obj[key]}
        }
        return newObj
    }

    toBackend() {
        return this.clone();
    }




}

export {Template};