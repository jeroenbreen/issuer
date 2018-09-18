import Vue from 'vue';
import {projectDetailsComponent} from './../project-details/project-details';
import {Project} from './../../../../store/models/Project';


const projectUpdateComponent = Vue.component('project-update', {
    data() {
        const getItemById = this.$store.getters['projects/getItemById'];
        let id, project;
        id = this.$route.params.id;
        if (id) {
            project = getItemById(id);
            if (project) {
                return {
                    currentProject: project,
                    project: new Project(project)
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    methods: {
        update: function() {
            this.$store.dispatch('projects/update', this.project).then(() => {
                this.$router.push({path: '/projects'});
            });
        },
        deleteItem: function() {
            this.$store.dispatch('projects/delete', this.project);
        },
        back: function() {
            this.$router.push('/projects');
        }
    },
    template: `
        <div class="page page--project-update">
            <h1>
                {{currentProject.title}}
            </h1>
            <project-detail v-bind:project="project"></project-detail>
            
            
            <div class="iss-button iss-button--alert" v-on:click="deleteItem()">
                Delete Project
            </div>
            <hr>
            <div class="iss-button" v-on:click="update()">
                Update Project
            </div>
            <div class="iss-button" v-on:click="back()">
                Back
            </div>
        </div>
    `
});

export {projectUpdateComponent}

