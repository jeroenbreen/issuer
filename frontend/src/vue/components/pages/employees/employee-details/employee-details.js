import Vue from 'vue';


const employeeDetailComponent = Vue.component('employee-detail', {
    props: ['user'],
    template: `
        <div class="employee-details">
            <input v-model="user.firstName" placeholder="First Name"><br>
            <input v-model="user.lastName" placeholder="Last Name"><br>
            <input v-model="user.initials" placeholder="Initials"><br>
            <input v-model="user.thumbnail" placeholder="Thumbnail"><br>
            <input v-model="user.email" placeholder="Email"><br>
            <input v-model="user.ghithubId" placeholder="Github ID"><br><br>
        </div>
    `
});

export {employeeDetailComponent}

