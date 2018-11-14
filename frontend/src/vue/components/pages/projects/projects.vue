<script>
    import projectCard from './project-card';

    export default {
        name: 'projects',
        components: {
            projectCard
        },
        methods: {
            getAll: function(){
                return this.$store.state.projects.all;
            },
            create: function() {
                this.$router.push('projects/new');
            }
        }
    }
</script>


<template>
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
            <md-button v-on:click="create()" class="md-primary">Create Project</md-button>
        </div>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';
    .project-cards {
        margin-bottom: 20px;
    }
</style>