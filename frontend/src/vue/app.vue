<script>
    import topBar from '@components/layout/top-bar';
    import menuBar from '@components/layout/menu-bar';
    import document from '@components/document/document';

    export default {
        components: {
            topBar, menuBar, document
        },
        methods: {
            hasCurrentUser() {
                return this.$store.state.users.current !== null;
            },
            hasDocument() {
                return this.$store.state.documents.current !== null;
            },
            showModal() {
                return this.$store.state.modal.show;
            }
        },
    }
</script>


<template>
    <div class="main">
        <top-bar/>
        <div class="content">
            <menu-bar/>
            <router-view></router-view>
        </div>

        <document v-if="hasDocument()"/>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>