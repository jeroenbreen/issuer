<script>
    import avatar from "@components/shared/avatar";
    import documentList from './document-list';
    import {Tools} from "@root/vue/tools/tools";
    import {Project} from "@models/Project";


    export default {
        name: 'project-card',
        components: {
            avatar, documentList
        },
        props: {
            project: {
                type: Project,
                required: true
            }
        },
        data() {
            return {
                localState: {
                    showSnackbar: false
                }
            }
        },
        methods: {
            setCurrent() {
                this.$store.commit('projects/setCurrentById', this.project._id);
            },
            gotoUpdate() {
                this.$router.push('projects/' + this.project._id);
                this.setCurrent();
            },
            statusNew(direction) {
                let frame, project, oldProject, status;

                frame = {};
                oldProject = this.project.toBackend();
                project = this.project.toBackend();
                status = this.getNewStatus(direction);
                if (status) {
                    project.status_id = status._id;
                } else {
                    project.status_id = null;
                }

                frame.undo = () => {
                    this.$store.dispatch('projects/update', oldProject).then(() => {
                        this.localState.showSnackbar = true;
                        this.setCurrent();
                    });
                };
                frame.redo = () => {
                    this.$store.dispatch('projects/update', project).then(() => {
                        this.localState.showSnackbar = true;
                        this.setCurrent();
                    });
                };

                frame.action = 'change status of ' + this.project.title;
                this.$history.addFrameAndExecute(frame);
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
            },
            getStatusName(direction) {
                let status = this.getNewStatus(direction);
                if (!status) {
                    return '';
                } else {
                    return status.title;
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
                    return client.getFullLabel(this.$root.$options.filters.documentIdFormatter, this.$store.state.settings.all.clientIdFormat);
                } else {
                    return '-';
                }
            },
            viewModusCompact() {
                return this.$store.state.settings.all.viewModusCompact__projects;
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

                <md-tooltip md-delay="500">Open project</md-tooltip>
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
                :class="{'icon-button--small': viewModusCompact}"
                class="icon-button">
                <div class="icon-button__icon">
                    <i class="fas fa-arrow-up"></i>
                </div>
                <md-tooltip md-delay="500">Change status to {{getStatusName(-1)}}</md-tooltip>
            </div>
            <div
                v-else
                class="icon-button-placeholder"
                :class="{'icon-button--small': viewModusCompact}"></div>

            <div
                v-if="getNewStatus(1)"
                @click="statusNew(1)"
                :class="{'icon-button--small': viewModusCompact}"
                class="icon-button">
                <div class="icon-button__icon">
                    <i class="fas fa-arrow-down"></i>
                </div>
                <md-tooltip md-delay="500">Change status to {{getStatusName(1)}}</md-tooltip>
            </div>
            <div
                v-else
                class="icon-button-placeholder"
                :class="{'icon-button--small': viewModusCompact}"></div>
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
        transition: $compact-transition;
        position: relative;

        &:hover {

            .project-card__title,
            .project-card__client {
                font-weight: 700;
            }
        }

        &.project--current {

            &:after {
                position: absolute;
                left: -15px;
                top: 50%;
                content: '';
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: #000;
                transform: translateY(-50%);
            }
        }

        .project-card__main {
            width: calc(100% - 92px);
            cursor: pointer;
            display: flex;
            height: 100%;
            box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
            border-radius: 2px;
            line-height: 1;

            .project-card__content {
                width: calc(100% - 476px);
                display: flex;
                height: 100%;

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
        }
    }

    .projects--compact {

        .project-card {
            height: 30px;
            margin-bottom: 2px;

            .project-card__main {
                box-shadow: none;
            }
        }
    }
</style>