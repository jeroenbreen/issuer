<script>
    import projectCard from './project-card';
    import searchBox from '@components/layout/search-box';

    export default {
        name: 'projects',
        components: {
            projectCard, searchBox
        },
        data() {
            return {
                search: {
                    label: 'Search projects',
                    value: ''
                }
            }
        },
        computed: {
            projects() {
                return this.$store.getters['projects/getAllSorted']().filter(project => {
                    let value = this.search.value.toLocaleLowerCase();
                    return project.title.toLowerCase().indexOf(value) > -1;
                });
            }
        },
        methods: {
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
            <search-box
                    :search-data="search"/>
        </div>
        <div class="view-frame-section">
            <div class="project-cards">
                <project-card
                    v-for="project in projects"
                    :key="project._id"
                    :project="project"/>
            </div>
        </div>
        <div class="view-frame-section">
            <md-button @click="create()" class="md-primary">Create Project</md-button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-cards {
        margin-bottom: 20px;
    }
</style>