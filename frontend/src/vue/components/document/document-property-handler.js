class DocumentPropertyHandler {

    constructor(store, template, company, document, page, documentIdFormatter, documentIdFormat, dateFormatter) {
        this.store = store;
        this.template = template;
        this.company = company;
        this.document = document;
        this.page = page;
        this.documentIdFormatter = documentIdFormatter;
        this.documentIdFormat = documentIdFormat;
        this.dateFormatter = dateFormatter;
        this.propertyHandlers = this.getAll();
        this.usedPropertyHandlers = this.getUsedPropertyHandlers();
    }





    getParsedValueOfTag(tag) {
        let propertyHandler = this.findPropertyHandlerByTag(tag);
        if (propertyHandler) {
            return propertyHandler.getParsedValue();
        } else {
            return null;
        }
    }

    getValueOfTag(tag) {
        let propertyHandler = this.findPropertyHandlerByTag(tag);
        if (propertyHandler) {
            return propertyHandler.getValue();
        } else {
            return null;
        }
    }


    // helpers

    findPropertyHandlerByTag(tag) {
        for (let set of this.propertyHandlers) {
            for (let propertyHandler of set.items) {
                if (propertyHandler.tag === tag) {
                    return propertyHandler;
                }
            }
        }
        return null;
    }

    showPropertyHandler(tag) {
        for (let item of this.template.items) {
            if (item.type === 'text' && item.content.indexOf('{' + tag + '}') > -1) {
                return true;
            }
        }
    }


    // getters

    getAll() {
        return [

            {
                title: 'General info',
                items: [
                    {
                        title: 'Date',
                        tag: 'document_date',
                        type: 'date',
                        editable: true,
                        getParsedValue: () => {
                            return this.dateFormatter(this.document.date);
                        },
                        getObjectPath() {
                            return ['document', 'date']
                        }
                    }, {
                        title: 'Document id',
                        tag: 'document_id',
                        type: 'input--number',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.getFormattedId(this.documentIdFormatter, this.documentIdFormat);
                        },
                        getObjectPath() {
                            return ['document', 'documentId']
                        }
                    }, {
                        title: 'Document subject',
                        tag: 'document_subject',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.subject;
                        },
                        getObjectPath() {
                            return ['document', 'subject']
                        }
                    }
                ]
            }, {
                title: 'Company info',
                items: [
                    {
                        title: 'Company name',
                        tag: 'company_name',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.company.name;
                        },
                        getObjectPath() {
                            return ['company', 'name']
                        }
                    }, {
                        title: 'User name',
                        tag: 'user_name',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.userName;
                        },
                        getObjectPath() {
                            return ['document', 'userName']
                        }
                    }, {
                        title: 'Company address',
                        tag: 'company_address',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.company.address;
                        },
                        getObjectPath() {
                            return ['company', 'address']
                        }
                    }, {
                        title: 'Company postcode',
                        tag: 'company_postcode',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.company.postcode;
                        },
                        getObjectPath() {
                            return ['company', 'postcode']
                        }
                    }, {
                        title: 'Company city',
                        tag: 'company_city',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.company.city;
                        },
                        getObjectPath() {
                            return ['company', 'city']
                        }
                    }
                ]
            }, {
                title: 'Client Info',
                items: [
                    {
                        title: 'Client company name',
                        tag: 'client_name',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.clientCompanyName;
                        },
                        getObjectPath() {
                            return ['document', 'clientCompanyName'];
                        }
                    }, {
                        title: 'Client contact name',
                        tag: 'client_contact',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.clientContactName;
                        },
                        getObjectPath() {
                            return ['document', 'clientContactName'];
                        }
                    }, {
                        title: 'Client address',
                        tag: 'client_address',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.clientStreet;
                        },
                        getObjectPath() {
                            return ['document', 'clientStreet'];
                        }
                    }, {
                        title: 'Client postcode',
                        tag: 'client_postcode',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.clientPostcode;
                        },
                        getObjectPath() {
                            return ['document', 'clientPostcode'];
                        }
                    }, {
                        title: 'Client city',
                        tag: 'client_city',
                        type: 'input',
                        editable: true,
                        getParsedValue: () => {
                            return this.document.clientCity;
                        },
                        getObjectPath() {
                            return ['document', 'clientCity'];
                        }
                    }
                ]
            }, {
                title: 'Misc',
                items: [
                    {
                        title: 'Page index',
                        tag: 'page_i',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.page.getIndex() + 1;
                        },
                        getObjectPath() {
                            return null;
                        }
                    }, {
                        title: 'Page length',
                        tag: 'document_l',
                        type: 'input',
                        editable: false,
                        getParsedValue: () => {
                            return this.document.pages.length;
                        }
                    }
                ]
            }

        ]
    }

    getUsedPropertyHandlers() {
        let propertyHandlers = [];
        for (let set of this.propertyHandlers) {
            let thisSet = {};
            thisSet.title = set.title;
            thisSet.items = [];
            for (let propertyHandler of set.items) {
                if (this.showPropertyHandler(propertyHandler.tag)) {
                    thisSet.items.push(propertyHandler);
                }
            }
            if (thisSet.items.length > 0) {
                propertyHandlers.push(thisSet);
            }
        }

        return propertyHandlers;
    }
}

export {DocumentPropertyHandler}