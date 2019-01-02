<script>
    import documentMini from '@components/document/document-mini';
    import {Project} from '@models/Project';
    import {Document} from '@models/Document';


    export default {
        name: 'document-list',
        components: {
            documentMini
        },
        props: {
            type: {
                type: String,
                required: true,
                validator: function (value) {
                    return value === 'invoice' || value === 'quotation';
                }
            },
            project: {
                type: Project,
                required: true
            },
            max: {
                type: Number
            }
        },
        computed: {
            documents() {
                let getSet = this.$store.getters['documents/getSet'](this.type, this.project._id);
                if (this.max) {
                    return getSet.slice(0, this.max);
                } else {
                    return getSet;
                }
            },
            moreDocuments() {
                if (this.max) {
                    let getSet = this.$store.getters['documents/getSet'](this.type, this.project._id);
                    return getSet.splice(this.max);
                } else {
                    return [];
                }
            }
        },
        methods: {
            createDocument() {
                let client, document, hasTemplate, hasClient, router, projectId, fullName;
                client = this.$store.getters['clients/getItemById'](this.project.client_id);
                router = this.$router;
                hasTemplate = this.$store.state.settings.all['template_' + this.type + '_id'] !== '';
                hasClient = Boolean(client);
                projectId = this.project._id;
                fullName = this.$store.state.users.current ? this.$store.state.users.current.getFullName() : '';


                function callbackTemplate() {
                    router.push({path: '/templates'});
                }

                function callbackClient() {
                    router.push({path: '/projects/' + projectId});
                }


                if (!hasTemplate || !hasClient) {
                    if (!hasTemplate) {
                        this.$store.commit('confirm', {
                            message: 'You didnt set the template for this type of document (or didnt even created it).<br><br>You need to do so, in order to create this document.',
                            callback: callbackTemplate,
                            buttons: {
                                yes: 'Take me to the templates',
                                no: 'Cancel'
                            }
                        });
                    } else {
                        this.$store.commit('confirm', {
                            message: 'You didnt select a client for this project.<br><br>You need to do so, in order to create this document.',
                            callback: callbackClient,
                            buttons: {
                                yes: 'Take me to the project details',
                                no: 'Cancel'
                            }
                        });
                    }
                } else {
                    document = {
                        type: this.type,
                        documentId: this.$store.getters['documents/getDocumentId'](this.type),
                        project_id: this.project._id,
                        locked: false,
                        date: '2010-01-01',
                        subject: this.project.title,
                        userName: fullName,
                        clientCompanyName: client.companyName,
                        clientContactName: client.contactFirstName + ' ' + client.contactLastName,
                        clientStreet: client.street,
                        clientPostcode: client.postcode,
                        clientCity: client.city,
                        rate: this.project.rate,
                        currency: this.project.currency,
                        pages: [{}]
                    };
                    this.$store.dispatch('documents/create', document).then(() => {
                        this.$store.commit('documents/setCurrent', new Document(document));
                        this.$store.commit('projects/setCurrentById', this.project._id);
                    });
                }
            }
        }
    }
</script>


<template>
    <div class="document-list">
        <document-mini
                v-for="(document, index) in documents"
                :document="document"
                :key="index">
        </document-mini>


        <md-menu v-if="moreDocuments.length > 0">
            <div class="document-list__more" md-menu-trigger>
                {{moreDocuments.length}} more...
            </div>

            <md-menu-content class="document-list__popup">
                <md-menu-item
                    v-for="(document, index) in moreDocuments"
                    :key="index">
                    <document-mini :document="document">
                    </document-mini>
                </md-menu-item>
            </md-menu-content>
        </md-menu>

        <div
            @click="createDocument()"
            class="icon-button icon-button--small">
            <div class="icon-button__icon">
                <i class="fas fa-plus"></i>
            </div>
            <md-tooltip md-delay="500">Create new {{type}} for this project</md-tooltip>
        </div>
    </div>

</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .document-list {
        display: flex;
        align-items: center;
        height: 20px;

        .document-list__more {
            background: #ddd;
            padding: 1px 4px;
            border-radius: 6px;
            cursor: pointer;
            white-space: nowrap;
            font-size: 9px;
            margin-right: 4px;

            &:hover {
                background: #aaa;
            }
        }

        .icon-button {
            //opacity: 0.3;
        }

        &:hover {

            .icon-button {
                opacity: 1
            }
        }
    }

    .document-list__popup {
        width: 112px;

        .md-list-item-container {
            font-size: 11px;
        }
    }

</style>