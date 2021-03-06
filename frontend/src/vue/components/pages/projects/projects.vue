<script>
    import projectCard from './project-card';
    import projectsFilter from './projects-filter';
    import searchBox from '@components/layout/search-box';
    import viewModus from '@components/shared/view-modus';


    export default {
        name: 'projects',
        components: {
            projectCard, searchBox, projectsFilter, viewModus
        },
        // todo make dry with project-details
        mounted () {
            if (this.$route.query.document) {
                const getItem = this.$store.getters['documents/getItemById'];
                const document = getItem(this.$route.query.document);
                if (document) {
                    this.$store.commit('documents/setCurrent', document);
                }
            }
        },
        data() {
            return {
                search: {
                    label: 'Search projects',
                    value: ''
                },
                filter: {
                    status_id: 0,
                    client_id: 0,
                    user_id: 0
                },
                localState: {
                    compact: this.$store.state.settings.all.viewModusCompact__projects
                }
            }
        },
        computed: {
            projects() {
                return this.$store.getters['projects/getAllSorted']().filter(project => {
                    let value = this.search.value.toLocaleLowerCase();
                    return project.title.toLowerCase().indexOf(value) > -1 &&
                        (this.filter.status_id === 0 || this.filter.status_id === project.status_id) &&
                        (this.filter.client_id === 0 || this.filter.client_id === project.client_id) &&
                        (this.filter.user_id === 0 || this.filter.user_id === project.user_id);
                });
            },
            total() {
                let total = 0;
                for (let project of this.projects) {
                    total += project.getBudget();
                }
                return total;
            },
            totalInvoice() {
                let total = 0;
                for (let project of this.projects) {
                    let status;
                    if (project.status_id) {
                        status = this.$store.getters['statuses/getItemById'](project.status_id);
                        if (status && status.type === 'invoice') {
                            total += project.getBudget();
                        }
                    }
                }
                return total;
            },
            mixedCurrency() {
                let standardCurrency = this.$store.state.settings.all.standardCurrency;
                for (let project of this.projects) {
                    if (project.currency !== standardCurrency) {
                        return true;
                    }
                }
                return false;
            },
            currentProject() {
                if (!this.$store.state.projects.currentId) {
                    return null;
                } else {
                    return this.$store.getters['projects/getItemById'](this.$store.state.projects.currentId);
                }
            }
        },
        methods: {
            create() {
                this.$router.push('projects/new');
            },
            getCurrency() {
                return this.$store.state.settings.all.standardCurrency;
            }
        }
    }
</script>


<template>
    <div
        :class="{'projects--compact': localState.compact}"
        class="view-frame view-frame--projects"
        v-scrim>
        <div class="view-frame-section">
            <h1>
                Projects
            </h1>
        </div>

        <div class="view-frame-section">
            <div class="view-frame-tools">
                <search-box
                        :search-data="search"/>

                <projects-filter
                        :filter="filter"/>

                <view-modus
                    :state="localState"
                    :type="'projects'"/>
            </div>
        </div>

        <div class="view-frame-section">
            <md-button
                @click="create()"
                class="md-primary">Create Project</md-button>
        </div>

        <div class="view-frame-section">
            <div class="project-cards">
                <project-card
                    v-for="project in projects"
                    :class="{'project--current': project === currentProject}"
                    :key="project._id"
                    :project="project"/>
            </div>

            <div class="projects-total">
                <div class="project-total__row">
                    <div class="project-total__left">
                        Total invoice + paid
                    </div>
                    <div class="project-total__main">
                    <span v-if="!mixedCurrency">
                         {{totalInvoice | currency}} {{getCurrency()}}
                    </span>
                        <span v-else>
                        Mixed currencies in the projects, not able to create total.
                    </span>
                    </div>
                </div>
                <div class="project-total__row">
                    <div class="project-total__left">
                        TOTAL
                    </div>
                    <div class="project-total__main">
                    <span v-if="!mixedCurrency">
                         {{total | currency}} {{getCurrency()}}
                    </span>
                        <span v-else>
                        Mixed currencies in the projects, not able to create total.
                    </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .project-cards {
        margin-bottom: 20px;
    }

    .projects-total {
        font-weight: 700;

        .project-total__row {
            display: flex;

            .project-total__left {
                text-align: right;
                width: calc(100% - 708px);
                padding: 10px;
            }

            .project-total__main {
                padding: 10px;
            }
        }
    }
</style>