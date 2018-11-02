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
            this.$store.dispatch('projects/delete', this.currentProject);
        },
        back: function() {
            this.$router.push('/projects');
        }
    },
    template: `
        <div class="view-frame view-frame--project-update" v-scrim>
            <div class="view-frame-section">
                <h1>
                    {{currentProject.title}}
                </h1>
            </div>

            <project-detail v-bind:project="project"></project-detail>
            
            <div class="view-frame-section">
                <md-button v-on:click="deleteItem()" class="md-primary">Delete Project</md-button>

                <md-button v-on:click="update()" class="md-primary">Update Project</md-button>

                <md-button v-on:click="back()" class="md-primary">Back</md-button>
            </div>
        </div>
    `
});

export {projectUpdateComponent}

