<script>
    let saveBuffer = null;

    export default {
        name: 'auto-saver',
        props: {
            watch: {
                type: Object,
                required: true
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
                    const url = this.storeModule + '/update';

                    if (saveBuffer) {
                        clearTimeout(this.saveBuffer);
                    }

                    saveBuffer = setTimeout(() => {
                        this.$store.dispatch(url, this.watch).then(() => {
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