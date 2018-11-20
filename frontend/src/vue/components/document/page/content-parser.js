export default {

    convertBreaks(content) {
        return content.replace(new RegExp('\r?\n','g'), '<br />');
    },


    parse(content, DocumentPropertyHandler){

        return this.convertBreaks(content).replace(/{\w+}/g, function(tag) {
            let cleaned = tag.slice(1, -1);
            return DocumentPropertyHandler.getParsedValueOfTag(cleaned);
        });
    }
}