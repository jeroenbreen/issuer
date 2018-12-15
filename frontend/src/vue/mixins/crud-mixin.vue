<script>
    export default {
        name: 'crud-mixin',
        methods: {
            $_crudMixin_create(obj, module, path) {
                return new Promise((resolve, reject) => {
                    let frame = {};

                    this.$store.dispatch(module + '/create', obj.toBackend()).then((result) => {
                        this.$router.push({path: '/' + path});

                        frame.undo = () => {
                            this.$store.dispatch(module + '/delete', result);
                        };
                        frame.redo = () => {
                            this.$store.dispatch(module + '/create', result);
                        };

                        frame.action = 'Created' + obj.getActionTitle();

                        this.$history.addFrame(frame);

                        resolve(frame);
                    });
                })
            },
            $_crudMixin_delete(obj, module, path) {
                let frame, objFlat;
                frame = {};
                objFlat = obj.toBackend();

                this.$store.commit('confirm', {
                    message: 'Are you sure?',
                    callback: () => {
                        this.$store.dispatch(module + '/delete', objFlat).then(() => {
                            this.$router.push('/' + path);

                            frame.undo = () => {
                                this.$store.dispatch(module + '/create', objFlat);
                            };
                            frame.redo = () => {
                                this.$store.dispatch(module + '/delete', objFlat);
                            };

                            frame.action = 'Deleted ' + obj.getActionTitle();

                            this.$history.addFrame(frame);
                        });
                    }
                });
            }

        }
    }

</script>


<template>


</template>


<style lang="scss">

</style>