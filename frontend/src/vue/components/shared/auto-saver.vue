<script>
    import {Company} from '@models/Company';
    import {Client} from '@models/Client';
    import {Project} from '@models/Project';
    import {User} from '@models/User';
    import {Template} from '@models/Template';

    let saveBuffer = null;

    export default {
        name: 'auto-saver',
        props: {
            watch: {
                type: Object,
                required: true,
                validator: function (value) {
                    return value.constructor === Company || value.constructor === Client || value.constructor === Project || value.constructor === Template || value.constructor === User;
                }
            },
            storeGet: {
                type: String,
                required: true
            },
            storeUpdate: {
                type: String,
                required: true
            }
        },
        data: function(){
            return {
                localState: {
                    showSnackbar: false
                }
            }
        },
        watch: {
            watch: {
                handler: function() {
                    let frame, oldObject, newObject;
                    frame = {};



                    if (saveBuffer) {
                        clearTimeout(this.saveBuffer);
                    }

                    // if we get the corresponding element via the store,
                    // we get the state before the update we are going to commit
                    // we can use this state for the undo
                    oldObject = this.$store.getters[this.storeGet](this.watch._id).toBackend();
                    newObject = this.watch.toBackend();

                    saveBuffer = setTimeout(() => {

                        if (!this.watch.$$watchIgnore) {
                            frame.undo = () => {
                                // the edit directly to the watched object, triggers
                                // this watch function again,
                                // which will handle the dispatch already itself
                                this.watch.updateAllPropertiesByClone(oldObject);
                                // this shouldn't create a new history frame
                                this.watch.$$watchIgnore = true;
                            };

                            frame.redo = () => {
                                this.watch.updateAllPropertiesByClone(newObject);
                                this.watch.$$watchIgnore = true;
                            };

                            this.$history.addFrame(frame);
                        } else {
                            delete this.watch.$$watchIgnore;
                        }


                        this.$store.dispatch(this.storeUpdate, this.watch.toBackend()).then(() => {
                            this.localState.showSnackbar = true;
                        });
                    }, 500);
                },
                deep: true
            }
        }
    }
</script>


<template>
    <md-snackbar
            :md-position="'left'"
            :md-duration="2000"
            :md-active.sync="localState.showSnackbar"
            md-persistent>
        <span>Saved...</span>
    </md-snackbar>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

</style>