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
            </div>
            <h1>
                New Project
            </h1>
        </div>
        <project-details :project="project"></project-details>

        <div class="view-frame-section">
            <div class="iss-button" @click="create()">
                Create Project
            </div>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>
