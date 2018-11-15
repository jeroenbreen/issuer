export default {

    parse(content, company, document, documentIdFormatter, documentIdFormat, dateFormatter){
        return content.replace(/{\w+}/g, function(tag) {
            let cleaned = tag.slice(1, -1);
            let obj = cleaned.split('_')[0];
            let property = cleaned.split('_')[1];

            if (obj === 'company') {
                return company[property];
            } else if (obj === 'document') {
                if (property === 'id') {
                    return document.getFormattedId(documentIdFormatter, documentIdFormat);
                } else if (property === 'date') {
                    return dateFormatter(document.date);
                } else {
                    return document[property];
                }

            } else {
                return '';
            }
        });
    }
}