import {Image} from './template/Image';
import {pageWidth} from './../globals'
import {Tools} from './../../tools/tools'



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
        this.frontPage = {items: []};
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
        return Tools.deepclone(this);
        // let obj = {...this};
        // obj.settings = Tools.deepclone(obj.settings);
        // obj.frontPage = {};
        // obj.frontPage.items = [];
        // for (let item of this.frontPage.items) {
        //     obj.frontPage.items.push(item.clone());
        // }
        // return obj;
    }



    toBackend() {
        return this.clone();
    }

    toPrint() {
        let obj = {...this};
        obj.settings = Tools.deepclone(obj.settings);
        obj.settings.logo.src = config.fromPrint + config.templateUrl + this.settings.logo.src;
        obj.frontPage.items = [];
        for (let item of this.frontPage.items) {
            obj.frontPage.items.push(item.toPrint());
        }
        return obj;
    }




}

export {Template};