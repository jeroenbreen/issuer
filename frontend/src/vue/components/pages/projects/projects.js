import Vue from 'vue';
import {projectCardComponent} from './project-card/project-card';



const projectsComponent = Vue.component('projects', {
    methods: {
        getAll: function(){
            return this.$store.state.projects.all;
        },
        create: function() {
            this.$router.push('projects/new');
        }
    },
    template: `
        <div class="view-frame view-frame--projects" v-scrim>
            <div class="view-frame-section">
                <h1>
                    Projects
                </h1>
            </div>
            <div class="view-frame-section">
                <div class="project-cards">
                    <project-card 
                        v-for="project in getAll()" 
                        v-bind:key="project._id"
                        v-bind:project="project"></project-card>
                </div>
            </div>
            <div class="view-frame-section">
                <div class="iss-button" v-on:click="create()">
                    Create Project
                </div>
            </div>
        </div>
    `
});

export {projectsComponent}