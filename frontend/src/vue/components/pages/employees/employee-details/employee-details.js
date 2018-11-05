import Vue from 'vue';


const employeeDetailsComponent = Vue.component('employee-detail', {
    props: ['user'],
    template: `
        <div class="view-frame-section">
            <div class="employee-details">
                <input v-model="user.firstName" placeholder="First Name"><br>
                <input v-model="user.lastName" placeholder="Last Name"><br>
                <input v-model="user.initials" placeholder="Initials"><br>
                <input v-model="user.thumbnail" placeholder="Thumbnail"><br>
                <input v-model="user.email" placeholder="Email"><br>
                <input v-model="user.githubKey" placeholder="Github Key"><br><br>
            </div>
        </div>
    `
});

export {employeeDetailsComponent}

