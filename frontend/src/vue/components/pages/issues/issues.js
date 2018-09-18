import Vue from 'vue';
import {issueCardComponent} from './issue-card/issue-card';



const issuesComponent = Vue.component('issues', {
    methods: {
        getAll: function(){
            return this.$store.state.issues.all;
        }
    },
    template: `
        <div class="page page--issues">
            <h1>
                Issues
            </h1>
            <div class="issue-cards">
                <issue-card 
                    v-for="issue in getAll()" 
                    v-bind:key="issue.id"
                    v-bind:issue="issue"></issue-card>
            </div>
        </div>
    `
});

export {issuesComponent}