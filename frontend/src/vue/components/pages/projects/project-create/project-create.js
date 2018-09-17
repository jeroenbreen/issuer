import Vue from 'vue';
import {projectDetailsComponent} from './../project-details/project-details';
import {Project} from './../../../../store/models/Project';


const projectCreateComponent = Vue.component('project-create', {
    data() {
        const project = new Project();
        console.log(this.$store.state.users.current);
        if (this.$store.state.users.current) {
            project.user_id = this.$store.state.users.current._id;
        }
        return {
            project: project
        }
    },
    methods: {
        create: function() {
            this.$store.dispatch('projects/create', this.project).then(() => {
                this.$router.push({path: '/projects'});
            });
        },
        back: function() {
            this.$router.push('/projects');
        }
    },
    template: `
        <div class="page page--project-create">
            <h1>
                New Project
            </h1>
            <project-detail v-bind:project="project"></project-detail>
               
            <div class="iss-button" v-on:click="create()">
                Create Project
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {projectCreateComponent}

