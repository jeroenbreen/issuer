<script>
    import documentList from './document-list';
    import autoSaver from '@components/shared/auto-saver';
    import Project from '@models/Project';


    export default {
        name: 'project-details',
        components: {
            documentList, autoSaver
        },
        props: {
            project: {
                type: Project,
                required: true
            },
            autoSave: {
                type: Boolean,
                required: true
            }
        },
        mounted () {
            if (this.$route.query.document) {
                const getItem = this.$store.getters['documents/getItemById'];
                const document = getItem(this.$route.query.document);
                if (document) {
                    this.$store.commit('documents/setCurrent', document);
                }
            }
        },
        computed: {
            statuses() {
                return this.$store.state.statuses.all;
            },
            clients() {
                return this.$store.state.clients.all;
            },
            users() {
                return this.$store.state.users.all;
            }
        }
    }
</script>


<template>
    <div class="details">
        <div class="view-frame-section">
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Title</label>
                        <md-input v-model="project.title" placeholder="Title"/>
                    </md-field>
                </div>
            </div>
        </div>
        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Management
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Client</label>
                        <md-select
                            v-model="project.client_id"
                            placeholder="Client">
                            <md-option
                                v-for="(client, index) in clients"
                                :value="client._id"
                                :key="index">{{client.companyName}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Employee</label>
                        <md-select
                            v-model="project.user_id"
                            placeholder="Employee">
                            <md-option
                                v-for="(user, index) in users"
                                :value="user._id"
                                :key="index">{{user.getFullName()}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Status</label>
                        <md-select
                                v-model="project.status_id"
                                placeholder="Status">
                            <md-option
                                    v-for="(status, index) in statuses"
                                    :value="status._id"
                                    :key="index">{{status.title}}</md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
        </div>

        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Financial
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Currency</label>
                        <md-input v-model="project.currency" placeholder="Currency"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Rate</label>
                        <md-input v-model="project.rate" type="number" placeholder="Rate"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Hours</label>
                        <md-input v-model="project.hours" type="number" placeholder="Hours"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Discount</label>
                        <md-input v-model="project.discount" type="number" placeholder="Discount"/>
                    </md-field>
                </div>
                <div class="details-row">
                    <div class="details-label">
                        Budget
                    </div>
                    <div class="details-content">
                        {{project.getBudget()}}
                    </div>
                </div>
            </div>
        </div>
        <a name="quotation"></a>
        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Quotations
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <div class="details-content">
                        <document-list
                            :type="'quotation'"
                            :project="project"/>

                    </div>
                </div>
            </div>
        </div>
        <a name="invoice"></a>
        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Invoices
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <div class="details-content">
                        <document-list
                            :type="'invoice'"
                            :project="project"/>
                    </div>
                </div>
            </div>
        </div>

        <auto-saver
            v-if="autoSave"
            :watch="project"
            :store-get="'projects/getItemById'"
            :store-update="'projects/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .issues__container {
        display: flex;
    }
</style>