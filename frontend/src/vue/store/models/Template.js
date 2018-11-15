import {Image} from './template/Image';
import {Text} from './template/Text';
import {pageWidth} from './../globals'
import {Tools} from './../../tools/tools'



class Template {

    constructor(template) {
        this._id = template && template._id ? template._id : null;
        this.company_id = template && template.company_id ? template.company_id : '';
        this.title = template && template.title ? template.title : '';
        this.margin = template ? template.margin : {
            top: 60,
            right: 70,
            bottom: 60,
            left: 70
        };
        this.front = {
            lines: {
                top: 340,
                height: 250
            }
        };
        this.follow = {
            lines: {
                top: 70,
                height: 500
            }
        };
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
                y: 680,
                width: 80,
                height: 80,
                page: 'follow',
                padding: 0,
                background: 'transparent'
            }, {
                type: 'text',
                content: 'Factuur {document_documentId}',
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
            }, {
                type: 'image',
                src: 'icon.png',
                x: 0,
                y: 0,
                width: 92,
                height: 42,
                page: 'follow',
                padding: 0,
                background: 'transparent'
            }, {
                type: 'text',
                content: '{company_name}<br>{company_address}<br>{company_postcode} {company_city}',
                x: 0,
                y: 180,
                width: 240,
                height: 80,
                page: 'front',
                padding: 10,
                background: 'transparent',
                textAlign: 'left'
            }, {
                type: 'text',
                content: '{document_clientCompanyName}<br>{document_clientContactName}<br>{document_clientStreet}<br>{document_clientPostcode} {document_clientCity}',
                x: 253,
                y: 180,
                width: 240,
                height: 80,
                page: 'front',
                padding: 10,
                background: 'transparent',
                textAlign: 'left'
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