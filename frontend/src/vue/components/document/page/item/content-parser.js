export default {

    convertBreaks(content) {
        return content.replace(new RegExp('\r?\n','g'), '<br />');
    },

    parse(content, documentPropertyHandler){
        return this.convertBreaks(content).replace(new RegExp(/{\w+}/g), function(tag) {
            let cleaned = tag.slice(1, -1);
            return documentPropertyHandler.getParsedValueOfTag(cleaned);
        });
    }
}