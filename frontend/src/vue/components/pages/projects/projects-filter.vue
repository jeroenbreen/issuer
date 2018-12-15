<script>
    const addEmpty = function(arr, key) {
        let emptyItem = {
            _id: 0,
        };
        emptyItem[key] = 'All';
        return [emptyItem, ...arr];
    };


    export default {
        name: 'projects-filter',
        props: {
            filter: {
                type: Object,
                required: true
            }
        },
        computed: {
            statuses() {
                return addEmpty(this.$store.state.statuses.all, 'title');
            },
            clients() {
                return addEmpty(this.$store.state.clients.all, 'companyName');
            },
            users() {
                return addEmpty(this.$store.state.users.all, 'initials');
            }
        }
    }
</script>


<template>
    <div class="projects-filter">
        <div class="projects-filter__status">
            <md-field>
                <md-select
                        v-model="filter.status_id"
                        placeholder="Status">
                    <md-option
                            v-for="(status, index) in statuses"
                            :value="status._id"
                            :key="index">{{status.title}}</md-option>
                </md-select>
            </md-field>
        </div>
        <div class="projects-filter__client">
            <md-field>
                <md-select
                        v-model="filter.client_id"
                        placeholder="Client">
                    <md-option
                            v-for="(client, index) in clients"
                            :value="client._id"
                            :key="index">{{client.companyName}}</md-option>
                </md-select>
            </md-field>
        </div>
        <div class="projects-filter__user">
            <md-field>
                <md-select
                        v-model="filter.user_id"
                        placeholder="User">
                    <md-option
                            v-for="(user, index) in users"
                            :value="user._id"
                            :key="index">{{user.initials}}</md-option>
                </md-select>
            </md-field>
        </div>
    </div>
</template>


<style lang="scss">
    .projects-filter {
        display: flex;

        > div {
            width: 200px;
            margin-left: 10px;
        }
    }
</style>