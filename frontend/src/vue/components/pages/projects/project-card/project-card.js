import Vue from 'vue';



const projectCardComponent = Vue.component('project-card', {
    methods: {
        deleteItem: function() {
            this.$store.dispatch('projects/delete', this.project);
        },
        update: function() {
            this.$router.push('projects/' + this.project._id)
        }
    },
    props: ['project'],
    template: `
        <div class="project-card">
            <div class="project-card__body">
                {{project.title}}
            </div>
            <div class="project-card__toolbar">
                <div class="icon-button icon-button--inverse" v-on:click="update()">
                    <div class="icon-button__icon">
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                    <div class="icon-button__label">
                        Update
                    </div>
                </div>
                <div class="icon-button icon-button--inverse" v-on:click="deleteItem()">
                    <div class="icon-button__icon">
                        <i class="fas fa-trash"></i>
                    </div>
                    <div class="icon-button__label">
                        Remove
                    </div>
                </div>
            </div>
        </div>
    `
});

export {projectCardComponent}

