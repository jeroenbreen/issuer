import Vue from 'vue';


const employeeDetailsComponent = Vue.component('employee-detail', {
    props: ['user'],
    template: `
        <div class="view-frame-section">
            <div class="view-frame-section__content">
                <div class="details-row">
                    <md-field>
                        <label>First Name</label>
                        <md-input v-model="user.firstName" placeholder="First Name"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Last Name</label>
                        <md-input v-model="user.lastName" placeholder="Last Name"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Initials</label>
                        <md-input v-model="user.initials" placeholder="Initials"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Thumbnail</label>
                        <md-input v-model="user.thumbnail" placeholder="Thumbnail"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Email</label>
                        <md-input v-model="user.email" placeholder="Email"></md-input>
                    </md-field>
                </div>
                <div class="details-row">
                    <md-field>
                        <label>Github Key</label>
                        <md-input v-model="user.githubKey" placeholder="Github Key"></md-input>
                    </md-field>
                </div>
            </div>
        </div>
    `
});

export {employeeDetailsComponent}

