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
        <div class="view-frame view-frame--project-create">
            <div class="view-frame-section">
                <h1>
                    New Project
                </h1>
            </div>
            <project-detail v-bind:project="project"></project-detail>
               
            <div class="view-frame-section">   
                <div class="iss-button" v-on:click="create()">
                    Create Project
                </div>
                <div class="iss-button" v-on:click="back()">
                    Back
                </div>
            </div>
        </div>
    `
});

export {projectCreateComponent}

