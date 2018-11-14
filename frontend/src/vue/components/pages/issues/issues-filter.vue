<script>
    export default {
        name: 'issues-filter',
        data: function(){
            return {
                filter: {...this.$store.state.issues.filter}
            }
        },
        created: function(){
            //
        },

        methods: {
            getProjects() {
                const allProjects = {
                    _id: 0,
                    title: 'All Projects'
                };
                return [allProjects, ...this.$store.state.projects.all];
            },
            updateFilter() {
                this.$store.commit('issues/updateFilter', this.filter);
            }
        }
    }
</script>


<template>
    <div class="issues-filter">
        <select v-model="filter.project_id"  v-on:change="updateFilter()">
            <option v-for="project in getProjects()" v-bind:value="project._id">
                {{project.title}}
            </option>
        </select>
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';</style>
