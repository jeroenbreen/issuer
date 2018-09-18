import Vue from 'vue';


const projectDetailsComponent = Vue.component('project-detail', {
    created: function(){
        this.onRepositoryChange();
    },
    data: function(){
        return {
            milestones: []
        }
    },
    methods: {
        getClients() {
            return this.$store.state.clients.all;
        },
        getUsers() {
            return this.$store.state.users.all;
        },
        getRepositories() {
            return this.$store.state.repositories.all;
        },
        deleteRespository() {
            this.project.repository_id = 0;
            this.onRepositoryChange();
        },
        deleteMilestone() {
            this.project.milestone_id = 0;
        },
        onRepositoryChange() {
            let self, getItem, repository, url;
            self = this;
            if (this.project.repository_id !== 0) {
                getItem = this.$store.getters['repositories/getItemByProperty'];
                repository = getItem('id', this.project.repository_id);
                url = 'https://api.github.com/repos/' + this.$store.state.company.githubHandle + '/' + repository.name + '/milestones?access_token=' + this.$store.state.company.githubKey;
                this.$http.get(url).then(response => {
                    console.log(response);
                    this.milestones = response.body;
                }, response => {
                    // error
                });
            }
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
                                <option v-for="client in getClients()" v-bind:value="client._id">
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
                                <option v-for="user in getUsers()" v-bind:value="user._id">
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
                           <select v-model="project.repository_id" v-on:change="onRepositoryChange()">
                                <option v-for="repository in getRepositories()" v-bind:value="repository.id">
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
                           <select v-model="project.milestone_id"">
                                <option v-for="milestone in milestones" v-bind:value="milestone.id">
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
                                <input v-model.number="project.rate" placeholder="Rate" type="number">
                            </div>
                        </div>
                        <div class="details-row">
                            <div class="details-label">
                                Hours
                            </div>
                            <div class="details-content">
                                <input v-model.number="project.hours" placeholder="Hours" type="number">
                            </div>
                        </div>
                        <div class="details-row">
                            <div class="details-label">
                                Discount
                            </div>
                            <div class="details-content">
                                <input v-model.number="project.discount" placeholder="Discount" type="number">
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
            </div>
        </div>     
    `
});

export {projectDetailsComponent}

