import Vue from 'vue';
import {Document} from './../../../../store/models/Document';
import {documentMiniComponent} from './../../../document-mini/document-mini';

const projectDetailsComponent = Vue.component('project-detail', {
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
    },
    props: ['project'],
    template: `
        <div class="details">
    <div class="details-section">
        <div class="details-section__content">
            <div class="details-row">
                <div class="details-label">
                    Title
                </div>
                <div class="details-content">
                    <input v-model="project.title" placeholder="Title">
                </div>
            </div>
        </div>
    </div>
    <div class="details-section">
        <div class="details-section__header">
            Relations
        </div>
        <div class="details-section__content">
            <div class="details-row">
                <div class="details-label">
                    Client
                </div>
                <div class="details-content">
                    <select v-model="project.client_id">
                        <option v-for="client in getClients()"
                                v-bind:value="client._id">
                            {{client.companyName}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Employee
                </div>
                <div class="details-content">
                    <select v-model="project.user_id">
                        <option v-for="user in getUsers()"
                                v-bind:value="user._id">
                            {{user.getFullName()}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Repository
                </div>
                <div class="details-content">
                    <select v-model="project.repository_id"
                            v-on:change="updateMilestones()">
                        <option v-for="repository in getRepositories()"
                                v-bind:value="repository.id">
                            {{repository.name}}
                        </option>
                    </select>
                    <div class="icon-button" v-on:click="deleteRespository()">
                        <div class="icon-button__icon">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Milestone
                </div>
                <div class="details-content">
                    <select v-model="project.milestone_id"
                            v-on:change="setCurrentMilestone()">
                        <option v-for="milestone in milestones"
                                v-bind:value="milestone.id">
                            {{milestone.title}}
                        </option>
                    </select>
                    <div class="icon-button" v-on:click="deleteMilestone()">
                        <div class="icon-button__icon">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="details-row" v-if="this.currentMilestone">
                <div class="details-label">
                    Issues<br>
                    {{this.currentMilestone.open_issues}} /
                    {{this.currentMilestone.closed_issues +
                    this.currentMilestone.open_issues}}
                </div>
                <div class="details-content">
                    <div
                            v-for="issue in issues"
                            v-bind:class="{'issue-mini--closed': issue.state === 'closed'}"
                            v-bind:title="issue.title"
                            class="issue-mini">
                        {{issue.number}}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="details-section">
        <div class="details-section__header">
            Financial
        </div>
        <div class="details-section__content">
            <div class="details-row">
                <div class="details-label">
                    Currency
                </div>
                <div class="details-content">
                    <input v-model="project.currency" placeholder="Currency">
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Rate
                </div>
                <div class="details-content">
                    <input v-model.number="project.rate" placeholder="Rate"
                           type="number">
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Hours
                </div>
                <div class="details-content">
                    <input v-model.number="project.hours" placeholder="Hours"
                           type="number">
                </div>
            </div>
            <div class="details-row">
                <div class="details-label">
                    Discount
                </div>
                <div class="details-content">
                    <input v-model.number="project.discount"
                           placeholder="Discount" type="number">
                </div>
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
    <div class="details-section">
        <div class="details-section__header">
            Documents
        </div>
        <div class="details-section__content">
            <div class="details-row">
                <div class="details-label">
                    Invoices
                </div>
                <div class="details-content">
                    <document-mini 
                        v-for="(document, index) in getDocuments('invoice')"
                        v-bind:document="document"
                        v-bind:key="index">
                    </document-mini>
                
                
                    <div class="tool-button" v-on:click="createDocument('invoice')">
                        <div class="tool-button__icon">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="tool-button__label">
                            Add Invoice
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
   
    `
});

export {projectDetailsComponent}

