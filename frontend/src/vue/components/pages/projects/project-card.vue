<script>
    import avatar from "@components/shared/avatar";
    import documentList from './document-list';


    export default {
        name: 'project-card',
        components: {
            avatar, documentList
        },
        props: ['project'],
        data() {
            return {
                localState: {
                    showSnackbar: false
                }
            }
        },
        methods: {
            gotoUpdate: function() {
                this.$router.push('projects/' + this.project._id)
            },
            statusNew(direction) {
                let project = this.project.toBackend();
                let status = this.getNewStatus(direction);
                if (status) {
                    project.status_id = status._id;
                } else {
                    project.status_id = null;
                }
                this.$store.dispatch('projects/update', project).then(() => {
                    this.localState.showSnackbar = true;
                });
            },
            getNewStatus(direction) {
                let status = this.status;
                if (status) {
                    return this.$store.getters['statuses/getInOrder'](status.order, direction);
                } else {
                    return null;
                }
            }
        },
        computed: {
            statusColor() {
                let status = this.status;
                if (status) {
                    return status.color;
                } else {
                    return '#000';
                }
            },
            statusTitle() {
                let status = this.status;
                if (status) {
                    return status.title;
                } else {
                    return '-';
                }
            },
            status() {
                return this.$store.getters['statuses/getItemById'](this.project.status_id);
            },
            user() {
                return this.$store.getters['users/getItemById'](this.project.user_id);
            },
            client() {
                let client = this.$store.getters['clients/getItemById'](this.project.client_id);
                if (client) {
                    return client.getFullLabel(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.clientIdFormat);
                } else {
                    return '-';
                }
            }
        }
    }
</script>


<template>
    <div class="project-card">
        <div
            @click="gotoUpdate()"
            class="project-card__main">
            <div
                :style="{'background': statusColor}"
                class="project-card__status">
                {{statusTitle}}
            </div>
            <div class="project-card__client">
                {{client}}
            </div>
            <div class="project-card__title">
                {{project.title}}
            </div>
            <div class="project-card__budget">
                {{project.getBudget() | currency}} {{project.currency}}
            </div>
            <div class="project-card__user">
                <avatar
                    v-if="user"
                    :user="user"
                    :size="20"
                    :max="2"/>
            </div>
        </div>

        <div class="project-card__document-list">
            <document-list
                    :type="'quotation'"
                    :project="project"/>
        </div>

        <div class="project-card__document-list">
            <document-list
                    :type="'invoice'"
                    :project="project"
                    :max="2"/>
        </div>

        <div class="project-card__toolbar">
            <div
                v-if="getNewStatus(-1)"
                @click="statusNew(-1)"
                class="icon-button">
                <div class="icon-button__icon">
                    <i class="fas fa-arrow-up"></i>
                </div>
            </div>
            <div v-else class="icon-button-placeholder"></div>

            <div
                v-if="getNewStatus(1)"
                @click="statusNew(1)"
                class="icon-button">
                <div class="icon-button__icon">
                    <i class="fas fa-arrow-down"></i>
                </div>
            </div>
            <div v-else class="icon-button-placeholder"></div>
        </div>

        <md-snackbar
                :md-position="'left'"
                :md-duration="2000"
                :md-active.sync="localState.showSnackbar"
                md-persistent>
            <span>Saved...</span>
        </md-snackbar>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-card {
        display: flex;
        height: 40px;
        margin-bottom: 2px;

        .project-card__main {
            width: calc(100% - 700px);
            cursor: pointer;
            display: flex;
            height: 100%;

            &:hover {

                > * {
                    background: $grey-10;
                }
            }

            > * {
                height: 100%;
                padding: $general-padding;
                overflow: hidden;
                margin-right: 2px;
                background: #fff;
            }

            .project-card__status {
                width: 80px;
                color: #fff;
                text-transform: uppercase;
                font-size: 10px;
                text-align: center;
            }

            .project-card__client {
                width: 150px
            }

            .project-card__title {
                width: calc(100% - 370px);
            }

            .project-card__budget {
                width: 100px;
                text-align: right;
            }

            .project-card__user {
                width: 40px;
            }
        }

        .project-card__document-list {
            width: 250px;
            padding: $general-padding;

            .document-list {
                height: 100%;
            }
        }

        .project-card__toolbar {
            width: 200px;
            display: flex;
            padding-left: 20px;

           .icon-button-placeholder {
                width: 32px;
                margin-right: 4px;
           }
        }




    }
</style>