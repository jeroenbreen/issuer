import {_Item} from './_Item';


class Text extends _Item {
    constructor(text) {
        super(text);
        this.type = 'text';
        this.content = text.content;
        this.textAlign = text.textAlign;
    }

    getContent(company, document) {
        return this.content.replace(/{\w+}/g, function(tag) {
            let cleaned = tag.slice(1, -1);
            let obj = cleaned.split('_')[0];
            let property = cleaned.split('_')[1];

            if (obj === 'company') {
                return company[property];
            } else if (obj === 'document') {
                return document[property];
            } else {
                return '';
            }
        });
    }
}

export {Text};