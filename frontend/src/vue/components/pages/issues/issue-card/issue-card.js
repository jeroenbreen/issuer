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
        <div class="issue-card">
            <div class="issue-card__number">
                #{{issue.number}}
            </div>
            <div class="issue-card__title">
                {{issue.title}}
            </div>
            <div class="issue-card__repository">
                {{issue.repository.name}}
            </div>
            <div class="issue-card__milestone">
                {{issue.milestone.title}}
            </div>
            <div class="issue-card__project">
                {{getProject()}}
            </div>
            <div class="issue-card__assignees">
                
            </div>
        </div>
    `
});

export {issueCardComponent}

