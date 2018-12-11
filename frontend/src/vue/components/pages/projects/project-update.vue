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
                        project: new Project(project.toBackend())
                    }
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        methods: {
            deleteItem: function() {
                const store = this.$store;
                const project = this.project.toBackend();
                const router = this.$router;

                function callback() {
                    store.dispatch('projects/delete', project).then((response) => {
                        router.push('/projects');
                    });
                }

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: callback
                });
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
                {{project.title}}
            </h1>
        </div>

        <project-details
            :project="project"
            :auto-save="true"/>

        <div class="view-frame-section">
            <md-button @click="deleteItem()" class="md-primary">Delete Project</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>