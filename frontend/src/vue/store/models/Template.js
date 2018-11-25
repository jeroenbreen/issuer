import {Image} from './template/Image';
import {Text} from './template/Text';
import {Border} from './template/Border';
import {Total} from './template/Total';
import {Lines} from './template/Lines';
import {Tools} from './../../tools/tools'
import {pageWidth} from '@root/globals'
import {fallBackDocumentMargin} from '@models/fallbacks'



class Template {

    constructor(template) {
        this._id = template && template._id ? template._id : null;
        this.company_id = template && template.company_id ? template.company_id : '';
        this.title = template && template.title ? template.title : '';
        this.margin = template ? template.margin : fallBackDocumentMargin;
        this.items = [];
        if (template) {
            this.importItems(template);
        }
    }

    // getters

    getLinesItem(page) {
        for (let item of this.items) {
            if (item.type === 'lines' && item.page === page) {
                return item;
            }
        }
        return null;
    }

    // actions

    importItems(template) {
        for(let item of template.items) {
            this.addItem(item);
        }
    }

    addItem(data) {
        let item;
        switch (data.type) {
            case 'image':
                item = new Image(data);
                break;
            case 'text':
                item = new Text(data);
                break;
            case 'border':
                item = new Border(data);
                break;
            case 'total':
                item = new Total(data);
                break;
            case 'lines':
                item = new Lines(data);
                break;
        }
        this.items.push(item);
    }

    removeItem(item) {
        let index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    }

    // getters

    getElementAreaWidth() {
        return pageWidth - this.margin.left - this.margin.right;
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