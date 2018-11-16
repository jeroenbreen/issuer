export default {

    parse(content, company, document, page, documentIdFormatter, documentIdFormat, dateFormatter){
        return content.replace(/{\w+}/g, function(tag) {
            let cleaned = tag.slice(1, -1);
            let obj = cleaned.split('_')[0];
            let property = cleaned.split('_')[1];

            switch(obj){
                case 'company':
                    return company[property];

                case 'document':
                    switch (property) {
                        case 'id':
                            return document.getFormattedId(documentIdFormatter, documentIdFormat);
                        case 'date':
                            return dateFormatter(document.date);
                        case 'l':
                            return document.pages.length;
                        default:
                            return document[property];
                    }

                case 'page':
                    switch (property){
                        case 'i':
                            return document.pages.indexOf(page) + 1;
                    }

                default:
                    return '';
            }
        });
    }
}