<script>
    import topBar from '@components/layout/top-bar';
    import menuBar from '@components/layout/menu-bar';
    import document from '@components/document/document';
    import modal from '@components/layout/modal';
    import welcomeScreen from '@components/layout/welcome-screen';

    export default {
        components: {
            topBar, menuBar, document, modal, welcomeScreen
        },
        methods: {
            hasCurrentUser() {
                return this.$store.state.users.current !== null;
            },
            hasDocument() {
                return this.$store.state.documents.current !== null;
            },
            isLoaded() {
                return this.$store.state.company;
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
        <div v-if="isLoaded()" class="content">
            <menu-bar/>
            <router-view></router-view>
        </div>

        <document v-if="hasDocument()"/>

        <modal v-if="showModal()"></modal>

        <welcome-screen v-if="!hasCurrentUser()"></welcome-screen>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>