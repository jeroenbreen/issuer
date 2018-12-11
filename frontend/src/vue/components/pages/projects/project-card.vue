<script>
    import avatar from "@components/shared/avatar";
    import documentList from './document-list';
    import {Tools} from "@root/vue/tools/tools";


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
            },
            getLightColor() {
                return Tools.colorTone(this.statusColor, 0.2);
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
    <div
        class="project-card">
        <div
            :style="{'border': '1px solid ' + statusColor}"
            class="project-card__main">
            <div
                @click="gotoUpdate()"
                :style="{'background': getLightColor()}"
                class="project-card__content">
                <div
                    :style="{'border-left': '8px solid ' + statusColor}"
                    class="project-card__status">
                    {{statusTitle}}
                </div>
                <div class="project-card__client">
                    {{client | kebabFormatter}}
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
                        :project="project"
                        :max="2"/>
            </div>

            <div class="project-card__document-list">
                <document-list
                        :type="'invoice'"
                        :project="project"
                        :max="2"/>
            </div>
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
        height: 50px;
        margin-bottom: 4px;

        .project-card__main {
            width: calc(100% - 92px);
            cursor: pointer;
            display: flex;
            height: 100%;
            box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
            border-radius: 2px;

            .project-card__content {
                width: calc(100% - 476px);
                display: flex;
                height: 100%;
                box-shadow: 2px 0 3px rgba(0,0,0,0.2);

                &:hover {

                    > * {
                        background: #fff;
                        border-right: 1px solid #ddd;
                    }
                }

                > * {
                    height: 100%;
                    padding: $general-padding;
                    overflow: hidden;
                    border-right: 1px solid #fff;
                    display: flex;
                    align-items: center;
                }

                .project-card__status {
                    width: 80px;
                }

                .project-card__client {
                    width: calc(50% - 110px);
                }

                .project-card__title {
                    width: calc(50% - 110px);
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
                width: 238px;
                padding: $general-padding;
                background: #fff;
                height: 100%;

                .document-list {
                    height: 100%;
                }
            }
        }



        .project-card__toolbar {
            width: 92px;
            display: flex;
            padding-left: 10px;

           .icon-button-placeholder {
                width: 32px;
                margin-right: 4px;
           }
        }
    }
</style>