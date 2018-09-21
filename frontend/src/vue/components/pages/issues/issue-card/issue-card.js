import Vue from 'vue';

const issueCardComponent = Vue.component('issue-card', {
    props: ['issue'],
    methods: {
        getProject() {
            const getItem = this.$store.getters['projects/getItemByProperty'];
            let project = getItem('repository_id', this.issue.repository.id);
            if (project) {
                return project.title;
            } else {
                return '';
            }
        }
    },
    template: `
        <a v-bind:href="issue.url" target="_blank" class="issue-card">
            <div class="issue-card__number">
                #{{issue.number}}
            </div>
            <div class="issue-card__project">
                {{getProject()}}
            </div>
            <div class="issue-card__repository">
                {{issue.repository.name}}
            </div>
            <div class="issue-card__date">
                {{issue.updatedAt | standardDate}}
            </div>
            <div class="issue-card__title">
                {{issue.title}}
            </div>

            <div class="issue-card__milestone">
                <div class="milestone" v-if="issue.milestone.title">
                    {{issue.milestone.title}}
                </div>
            </div>
            <div class="issue-card__created-by">
                {{issue.createdBy}}
            </div>
            <div class="issue-card__assignees">
                <div 
                    v-for="assignee in issue.assignees" 
                    v-bind:style="{'background-image': 'url(' + assignee.avatar_url + ')'}"
                    class="assignee-avatar"></div>
            </div>
        </a>
    `
});

export {issueCardComponent}

