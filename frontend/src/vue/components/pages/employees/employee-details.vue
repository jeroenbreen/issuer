<script>
    import autoSaver from '@components/shared/auto-saver';
    import {User} from '@models/User';

    export default {
        name: 'employee-details',
        components: {
            autoSaver
        },
        props: {
            user: {
                type: User,
                required: true
            },
            autoSave: {
                type: Boolean,
                required: false,
                default: false
            }
        }
    }
</script>


<template>
    <div class="view-frame-section">
        <div class="view-frame-section__content">
            <div class="details-row">
                <md-field>
                    <label>First Name</label>
                    <md-input v-model="user.firstName" placeholder="First Name"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Last Name</label>
                    <md-input v-model="user.lastName" placeholder="Last Name"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Initials</label>
                    <md-input v-model="user.initials" placeholder="Initials"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Thumbnail</label>
                    <md-input v-model="user.thumbnail" placeholder="Thumbnail"/>
                </md-field>
            </div>
            <div class="details-row">
                <md-field>
                    <label>Email</label>
                    <md-input v-model="user.email" placeholder="Email"/>
                </md-field>
            </div>
        </div>
        <auto-saver
                v-if="autoSave"
                :watch="user"
                :store-update="'users/update'"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .employee-details {
        max-width: 400px;

        input {
            width: 100%;
        }
    }
</style>