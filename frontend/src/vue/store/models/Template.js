import {Image} from './template/Image';
import {pageWidth} from './../globals'



class Template {

    constructor(template) {
        this._id = template._id ? template._id : null;
        this.company_id = template.company_id ? template.company_id : '';
        this.title = template.title;
        this.settings = template.settings;
        this.frontPage = {
            items: []
        };

        this.importItems(template);
    }

    getElementAreaWidth() {
        return pageWidth - this.settings.margin.left - this.settings.margin.right;
    }

    importItems(template) {
        template.frontPage = {};
        template.frontPage.items = [
            {
                type: 'image',
                horizontal: 'centered',
                vertical: '',
                x: 100,
                y: 590,
                width: 120,
                height: 100,
                z: 'auto',
                src: 'slogan.png'
            }
        ];
        for(let item of template.frontPage.items) {
            this.frontPage.items.push(this.importItem(item));
        }
    }

    importItem(item) {
        switch (item.type) {
            case 'image':
                return new Image(item);
        }
    }

    //

    getLogoSrc() {
            return config.fromFrontend + config.templateUrl + this.settings.logo.src;
    }

    //

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

    toPrint() {
        let obj = this.clone();
        obj.settings.logo.src = config.fromPrint + config.templateUrl + this.settings.logo.src;
        obj.frontPage.items = [];
        for (let item of this.frontPage.items) {
            obj.frontPage.items.push(item.toPrint());
        }
        console.log(obj);
        return obj;
    }




}

export {Template};