<script>
    import projectDetails from './project-details';
    import {Project} from '@models/Project';

    export default {
        name: 'project-create',
        components: {
            projectDetails
        },
        data() {
            const project = new Project();
            project.status_id = this.$store.state.statuses.all[0]._id;
            project.currency = this.$store.state.settings.standardCurrency;
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
        }
    }
</script>


<template>
    <div class="view-frame view-frame--project-create">
        <div class="view-frame__header">
            <div
                @click="back()"
                class="view-frame__header-button">
                <i class="fas fa-arrow-left"></i>
                <md-tooltip md-delay="300" md-direction="bottom">Back to projects</md-tooltip>
            </div>
            <h1>
                New Project
            </h1>
        </div>
        <project-details
            :project="project"
            :auto-save="false"></project-details>

        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Project</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';
</style>
