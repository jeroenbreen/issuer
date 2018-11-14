<script>
    export default {
        name: 'issue-card',
        props: ['issue'],
        methods: {
            getProject() {
                const getItem = this.$store.getters['projects/getItemByProperty'];
                let project = getItem('repository_id', this.issue.repository.id);
                if (project) {
                    return project.title;
                } else {
                    return '';
                }
            }
        }
    }
</script>


<template>
    <a :href="issue.url" target="_blank" class="issue-card">
        <div class="issue-card__number">
            #{{issue.number}}
        </div>
        <div class="issue-card__project">
            {{getProject()}}
        </div>
        <div class="issue-card__repository">
            {{issue.repository.name}}
        </div>
        <div class="issue-card__date">
            {{issue.updatedAt | standardDate}}
        </div>
        <div class="issue-card__title">
            {{issue.title}}
        </div>

        <div class="issue-card__milestone">
            <div class="milestone" v-if="issue.milestone.title">
                {{issue.milestone.title}}
            </div>
        </div>
        <div class="issue-card__created-by">
            {{issue.createdBy}}
        </div>
        <div class="issue-card__assignees">
            <div
                v-for="assignee in issue.assignees"
                :style="{'background-image': 'url(' + assignee.avatar_url + ')'}"
                class="assignee-avatar"></div>
        </div>
    </a>
</template>


<style lang="scss">      @import '@styles/variables.scss';


    .issue-card {
        color: #000;
        text-decoration: none;

        &:hover {
            background: $grey-10;
        }

        border-bottom: $generalBorder;
        display: flex;

        > * {
            border-right: $generalBorder;
            padding: $general-padding;
        }

        > :first-child {
            border-left: $generalBorder;
        }

        .issue-card__number {
            width: 60px;
            flex-grow: 0;
        }

        .issue-card__title {
            width: 200px;
            overflow: hidden;
            flex-grow: 10;
        }

        .issue-card__date {
            width: 60px;
            flex-grow: 10;
        }

        .issue-card__repository {
            width: 100px;
            flex-grow: 10;
        }

        .issue-card__milestone {
            width: 100px;
            flex-grow: 20;
        }

        .issue-card__project {
            width: 100px;
            flex-grow: 15;
        }

        .issue-card__created-by {
            width: 100px;
            flex-grow: 15;
        }

        .issue-card__assignees {
            width: 100px;
            flex-grow: 20;
            display: flex;

            .assignee-avatar {
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: 50% 50%;
                margin-right: 4px;
                background-color: #fff;
                box-shadow: 1px 1px 2px rgba(0,0,0,0.2);

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }
</style>