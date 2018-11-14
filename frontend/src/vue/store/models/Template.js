import {Image} from './template/Image';
import {Text} from './template/Text';
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
        // this.footer = template && template.footer ? new TagText(template.footer) : new TagText();
        this.dictionary = template ? template.dictionary : {
            invoice: "Invoice",
            subject: "Subject",
            footer: "Please transfer this amount within four weeks, stating...</b>"
        };
        // this.frontPage = {
        //     items: []
        // };

        this.items = [];
        template.items = [
            {
                type: 'image',
                src: 'logo.png',
                x: 0,
                y: 0,
                width: 160,
                height: 100,
                page: 'front',
                padding: 0,
                background: 'transparent'
            }, {
                type: 'image',
                src: 'slogan.png',
                x: 178.5,
                y: 590,
                width: 120,
                height: 100,
                page: 'front',
                padding: 0,
                background: 'transparent'
            }, {
                type: 'image',
                src: 'slogan.png',
                x: 198.5,
                y: 600,
                width: 80,
                height: 100,
                page: 'follow',
                padding: 0,
                background: 'transparent'
            }, {
                type: 'text',
                content: 'Factuur {document_id}',
                x: 340,
                y: 0,
                width: 140,
                height: 36,
                page: 'front',
                padding: 10,
                background: '#ddd',
                textAlign: 'center'
            }, {
                type: 'text',
                content: '{document_date}',
                x: 280,
                y: 0,
                width: 90,
                height: 36,
                page: 'front',
                padding: 10,
                background: 'transparent',
                textAlign: 'center'
            }
        ];

        if (template) {
            this.importItems(template);
        }
    }

    // actions

    importItems(template) {
        for(let item of template.items) {
            switch (item.type) {
                case 'image':
                    this.items.push(new Image(item));
                    break;
                case 'text':
                    this.items.push(new Text(item));
                    break;
            }
        }
    }

    addItem(type, data, page) {
        let item;
        switch (type) {
            case 'image':
                item = new Image(data);
                break;
            case 'text':
                item = new Text(data);
                break;
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