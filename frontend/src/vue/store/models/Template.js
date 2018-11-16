import {Image} from './template/Image';
import {Text} from './template/Text';
import {Tools} from './../../tools/tools'
import {pageWidth} from '@root/globals'



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
        this.front = template ? template.front : {
            lines: {
                type: 'box',
                y: 340,
                height: 250
            }
        };
        this.follow = template ? template.follow : {
            lines: {
                type: 'box',
                y: 70,
                height: 500
            }
        };
        this.items = [];
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