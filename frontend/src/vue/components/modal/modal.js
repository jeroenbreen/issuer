import Vue from 'vue';


const modalComponent = Vue.component('modal', {
    data() {
        return {
            message: 'Hello'
        }
    },
    methods: {
        close() {
            this.$store.commit('closeModal');
        },
        getModalData() {
            return this.$store.state.modal;
        },
        confirm() {
            if (this.$store.state.modal.callback && typeof this.$store.state.modal.callback === 'function') {
                this.$store.state.modal.callback();
            }
            this.close();
        },
        deny() {
            this.close();
        }
    },
    template: `
        <div class="cover" v-on:click="close()">
            <div class="modal">
                <div class="modal__body">
                    {{getModalData().message}}            
                </div>
                
                <div class="modal__footer">
                    <div v-if="getModalData().type === 'confirm'" class="modal__confirm">
                        <md-button v-on:click="confirm()" class="md-primary">{{getModalData().buttons.yes}}</md-button>
                        <md-button v-on:click="deny()" class="md-primary">{{getModalData().buttons.no}}</md-button>
                    </div>
                </div>
                
                <div v-on:click="close()" class="modal__close"></div>
            </div> 
        </div>
    `
});

export {modalComponent}



