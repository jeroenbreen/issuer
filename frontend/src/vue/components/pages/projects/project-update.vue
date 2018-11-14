<script>
    import projectDetails from './project-details';
    import {Project} from '@models/Project';

    export default {
        name: 'project-update',
        components: {
            projectDetails
        },
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
        }
    }

</script>


<template>
    <div class="view-frame view-frame--project-update" v-scrim>
        <div class="view-frame__header">
            <div
                    @click="back()"
                    class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
            </div>
            <h1>
                {{currentProject.title}}
            </h1>
        </div>

        <project-details :project="project"/>

        <div class="view-frame-section">
            <md-button @click="deleteItem()" class="md-primary">Delete Project</md-button>

            <md-button @click="update()" class="md-primary">Update Project</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>