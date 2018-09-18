import Vue from 'vue';



const projectCardComponent = Vue.component('project-card', {
    methods: {
        update: function() {
            this.$router.push('projects/' + this.project._id)
        }
    },
    props: ['project'],
    template: `
        <div class="project-card"  v-on:click="update()">
            {{project.title}}
        </div>
    `
});

export {projectCardComponent}

