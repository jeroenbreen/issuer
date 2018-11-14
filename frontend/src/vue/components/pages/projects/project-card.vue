<script>
    export default {
        name: 'project-card',
        props: ['project'],
        methods: {
            update: function() {
                this.$router.push('projects/' + this.project._id)
            }
        }
    }
</script>


<template>
    <div class="project-card"  @click="update()">
        {{project.title}}
    </div>
</template>


<style lang="scss">      @import '@styles/variables.scss';


    .project-card {
        border-bottom: $generalBorder;
        border-left: $generalBorder;
        border-right: $generalBorder;
        padding: $general-padding;
        cursor: pointer;

        &:first-child {
            border-top: $generalBorder;
        }

        &:hover {
            background: $grey-10;
        }
    }
</style>