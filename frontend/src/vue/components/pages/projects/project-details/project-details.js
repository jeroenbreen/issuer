import Vue from 'vue';


const projectDetailsComponent = Vue.component('project-detail', {
    methods: {
        getClients() {
            return this.$store.state.clients.all;
        },
        getUsers() {
            return this.$store.state.users.all;
        }
    },
    props: ['project'],
    template: `
        <div class="employee-details">
            <input v-model="project.title" placeholder="Title"><br>
            <input v-model="project.repository" placeholder="Repository"><br>
            <hr>
            <select v-model="project.client_id">
                <option v-for="client in getClients()" v-bind:value="client._id">
                    {{client.companyName}}
                </option>
            </select>
            <br><br>
            <select v-model="project.user_id">
                <option v-for="user in getUsers()" v-bind:value="user._id">
                    {{user.getFullName()}}
                </option>
            </select><br>
            <hr>
            <input v-model="project.currency" placeholder="Currency"><br>
            <input v-model.number="project.rate" placeholder="Rate" type="number"><br><br>
            <input v-model.number="project.hours" placeholder="Hours" type="number"><br><br>
            <input v-model.number="project.discount" placeholder="Discount" type="number"><br><br>
        </div>
    `
});

export {projectDetailsComponent}

