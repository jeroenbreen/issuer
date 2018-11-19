<script>
    import {Document} from '@models/Document';
    import documentMini from '@components/document/document-mini';

    export default {
        name: 'project-details',
        components: {
            documentMini
        },
        props: ['project'],
        mounted () {
            if (this.$route.query.document) {
                const getItem = this.$store.getters['documents/getItemById'];
                const document = getItem(this.$route.query.document);
                if (document) {
                    this.$store.commit('documents/setCurrent', document);
                }
            }
        },
        created: function(){
            this.updateMilestones();
        },
        data: function(){
            return {
                milestones: [],
                currentMilestone: null,
                issues: []
            }
        },
        methods: {
            getClients() {
                return this.$store.state.clients.all;
            },
            getUsers() {
                return this.$store.state.users.all;
            },
            showIssues() {
                return this.$store.state.settings.issues;
            },
            getRepository() {
                const getItem = this.$store.getters['repositories/getItemByProperty'];
                return getItem('id', this.project.repository_id);
            },
            getRepositories() {
                return this.$store.state.repositories.all;
            },
            deleteRespository() {
                this.project.repository_id = 0;
                this.updateMilestones();
            },
            deleteMilestone() {
                this.project.milestone_id = 0;
            },
            updateMilestones() {
                let repository, url;
                if (this.project.repository_id !== 0) {
                    repository = this.getRepository();
                    url = 'https://api.github.com/repos/' + this.$store.state.company.githubHandle + '/' + repository.name + '/milestones?access_token=' + this.$store.state.company.githubKey;
                    this.$http.get(url).then(response => {
                        this.milestones = response.body;
                        this.setCurrentMilestone();
                        this.updateIssues();
                    }, response => {
                        // error
                    });
                }
            },
            setCurrentMilestone() {
                if (this.project.milestone_id !== 0) {
                    this.currentMilestone = this.milestones.find(item => item.id === this.project.milestone_id);
                    this.updateIssues();
                }
            },
            updateIssues() {
                if (this.project.milestone_id !== 0) {
                    let repository, url;
                    repository = this.getRepository();
                    url = 'https://api.github.com/repos/' + this.$store.state.company.githubHandle + '/' + repository.name + '/issues?per_page=500&milestone=' + this.currentMilestone.number + '&state=all&access_token=' + this.$store.state.company.githubKey;
                    this.$http.get(url).then(response => {
                        this.issues = response.body;
                    }, response => {
                        // error
                    });
                }
            },
            getDocuments(type) {
                const getSet = this.$store.getters['documents/getSet'];
                return getSet(type, this.project._id);
            },
            createDocument(type) {
                let client, document;
                const getItemById = this.$store.getters['clients/getItemById'];
                client = getItemById(this.project.client_id);
                document = {
                    type: type,
                    documentId: 1,
                    project_id: this.project._id,
                    locked: false,
                    date: '2010-01-01',
                    subject: this.project.title,
                    userName: this.$store.state.users.current.getFullName(),
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
                });
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
                Relations
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>Client</label>
                        <md-select
                            v-model="project.client_id"
                            placeholder="Client">
                            <md-option
                                v-for="(client, index) in getClients()"
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
                                v-for="(user, index) in getUsers()"
                                :value="user._id"
                                :key="index">{{user.getFullName()}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div v-if="showIssues()" class="details-row">
                    <md-field>
                        <label>Repository</label>
                        <md-select
                                v-model="project.repository_id"
                                @md-selected="updateMilestones()"
                                placeholder="Repository">
                            <md-option
                                v-for="(repository, index) in getRepositories()"
                                :value="repository.id"
                                :key="index">{{repository.name}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div v-if="showIssues()" class="details-row">
                    <md-field>
                        <label>Milestone</label>
                        <md-select
                                v-model="project.milestone_id"
                                placeholder="Milestone">
                            <md-option
                                v-for="(milestone, index) in milestones"
                                :value="milestone.id"
                                :key="index">{{milestone.title}}</md-option>
                        </md-select>
                    </md-field>
                    <div class="icon-button" @click="deleteMilestone()">
                        <div class="icon-button__icon">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="view-frame-section" v-if="showIssues() && this.currentMilestone">
            <div class="view-frame-section__header">
                Issues
            </div>
            <div class="view-frame-section__content">
                {{this.currentMilestone.open_issues}} /
                {{this.currentMilestone.closed_issues + this.currentMilestone.open_issues}}
                <br>
                <div class="issues__container">
                    <div
                            v-for="issue in issues"
                            :class="{'issue-mini--closed': issue.state === 'closed'}"
                            :title="issue.title"
                            class="issue-mini">
                        {{issue.number}}
                    </div>
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
        <div class="view-frame-section">
            <div class="view-frame-section__header">
                Invoices
            </div>
            <div class="view-frame-section__content">
                <div class="details-row">
                    <div class="details-content">
                        <document-mini
                            v-for="(document, index) in getDocuments('invoice')"
                            :document="document"
                            :key="index">
                        </document-mini>

                        <md-button @click="createDocument('invoice')" class="md-primary">Add Invoice</md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .issues__container {
        display: flex;
    }
</style>