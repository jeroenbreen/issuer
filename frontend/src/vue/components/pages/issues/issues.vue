<script>
    import issueCard from './issue-card';
    import issuesFilter from './issues-filter';

    export default {
        name: 'issues',
        components: {
            issueCard, issuesFilter
        },
        methods: {
            getFiltered: function() {
                return this.$store.getters['issues/getFiltered'];
            }
        }
    }
</script>



<template>
    <div class="view-frame view-frame--issues" v-scrim>
        <div class="view-frame-section">
            <h1>
                Issues
            </h1>
        </div>

        <div class="view-frame-section">
            <issues-filter/>
        </div>

        <div class="view-frame-section">
            <div class="issue-cards__table">
                <div class="issue-cards__header issue-cards">
                    <div class="issue-card">
                        <div class="issue-card__number">
                            #
                        </div>
                        <div class="issue-card__project">
                            Project
                        </div>
                        <div class="issue-card__repository">
                            Repository
                        </div>
                        <div class="issue-card__date">
                            Updated at
                        </div>
                        <div class="issue-card__title">
                            Title
                        </div>

                        <div class="issue-card__milestone">
                            Milestone
                        </div>

                        <div class="issue-card__created-by">
                            Created By
                        </div>
                        <div class="issue-card__assignees">
                            Assignees
                        </div>
                    </div>
                </div>
            </div>

            <div class="issue-cards__body issue-cards">
                <issue-card
                    v-for="issue in getFiltered()"
                    :key="issue.id"
                    :issue="issue"/>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .issues-filter {
        height: 20px;
        margin-bottom: 20px;
    }


    .issue-cards__table {

        .issue-cards__header {
            border-top: $generalBorder;
            font-weight: 700;
        }

        .issue-cards__body {

        }
    }
</style>