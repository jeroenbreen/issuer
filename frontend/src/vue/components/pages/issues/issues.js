import Vue from 'vue';
import {issueCardComponent} from './issue-card/issue-card';
import {issuesFilterComponent} from './issues-filter/issues-filter';



const issuesComponent = Vue.component('issues', {
    methods: {
        getFiltered: function() {
            return this.$store.getters['issues/getFiltered'];
        }
    },
    template: `
        <div class="page page--issues" v-scrim>
            <h1>
                Issues
            </h1>
            <issues-filter></issues-filter>
            <div class="issue-cards__table">
                <div class="issue-cards__header issue-cards">
                    <div class="issue-card">
                        <div class="issue-card__number">
                            #
                        </div>
                        <div class="issue-card__project">
                            Project
                        </div>
                        <div class="issue-card__repository">
                            Repository
                        </div>
                        <div class="issue-card__date">
                            Updated at
                        </div>
                        <div class="issue-card__title">
                            Title
                        </div>
            
                        <div class="issue-card__milestone">
                            Milestone
                        </div>
 
                        <div class="issue-card__created-by">
                            Created By
                        </div>
                        <div class="issue-card__assignees">
                            Assignees
                        </div>
                    </div>
                    
                </div>
                <div class="issue-cards__body issue-cards">
                    <issue-card 
                        v-for="issue in getFiltered()" 
                        v-bind:key="issue.id"
                        v-bind:issue="issue"></issue-card>
                </div>
            </div>
            
        </div>
    `
});

export {issuesComponent}