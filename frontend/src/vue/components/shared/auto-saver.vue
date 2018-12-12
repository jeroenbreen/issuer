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
            storeModule: {
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
                    if (saveBuffer) {
                        clearTimeout(this.saveBuffer);
                    }

                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch(this.storeModule, this.watch.toBackend()).then(() => {
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