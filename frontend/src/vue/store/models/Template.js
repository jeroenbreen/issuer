import {Image} from './template/Image';
import {pageWidth} from './../globals'
import {Tools} from './../../tools/tools'



class Template {

    constructor(template) {
        this._id = template && template._id ? template._id : null;
        this.company_id = template && template.company_id ? template.company_id : '';
        this.title = template && template.title ? template.title : '';
        this.settings = template ? template.settings : {
            addresses: {
                borderTop: 1,
                top: 140
            },
            content: {
                top: 250
            },
            subject: {
                borderTop: 1,
                borderBottom: 1
            },
            footerText: {
                borderTop: 1,
                borderBottom: 1
            },
            official: {
                top: 730
            }
        };
        this.logo = template ? new Image(template.logo) : new Image();
        this.margin = template ? template.margin : {
            top: 60,
            right: 70,
            bottom: 60,
            left: 70
        };
        this.dictionary = template ? template.dictionary : {
            invoice: "Invoice",
            subject: "Subject",
            footer: "Please transfer this amount within four weeks, stating...</b>"
        };
        this.frontPage = {
            items: []
        };

        if (template) {
            this.importItems(template);
        }
    }

    // actions

    importItems(template) {
        for(let item of template.frontPage.items) {
            this.addItem(item.type, item, 'frontPage');
        }
    }

    addItem(type, itemData, page) {
        let item;
        switch (type) {
            case 'image':
                item = new Image(itemData);
        }
        this[page].items.push(item);
    }

    removeItem(item) {
        let index = this.frontPage.items.indexOf(item);
        if (index > -1) {
            this.frontPage.items.splice(index, 1);
        }
    }

    // getters

    getElementAreaWidth() {
        return pageWidth - this.margin.left - this.margin.right;
    }

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