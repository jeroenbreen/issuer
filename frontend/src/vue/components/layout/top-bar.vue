<script>
    import logo from './logo';
    import {Tools} from "@root/vue/tools/tools";
    import {storeToFile, dataToStore} from '@root/vue/store/store-functions'


    export default {
        name: 'top-bar',
        props: ['model'],
        components: {
            logo
        },
        methods: {
            getCurrentUser() {
                return this.$store.state.users.current;
            },
            exportToFile() {
                let file = storeToFile(this.$store.state);


                function download(content, fileName, contentType) {
                    let el, file;
                    el = document.createElement('a');
                    file = new Blob([content], {type: contentType});
                    el.href = URL.createObjectURL(file);
                    el.download = fileName;
                    el.click();
                }

                download(JSON.stringify(file), 'doculator-state-' + this.$store.state.company.name  + '.txt', 'text/plain');
            },
            openFile() {
                let file, store;
                file = document.getElementById("open-file").files[0];
                store = this.$store;
                if (file) {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        let data = JSON.parse(evt.target.result);
                        if (data.type === 'doculator') {
                            dataToStore(store, data.state);
                        } else {
                            console.log('This doesnt look like a doculator file');
                        }
                    };
                    reader.onerror = function (evt) {
                        console.log('Error reading file');
                    };
                }
            }
        }
    }
</script>


<template>
    <div class="topbar">
        <logo/>

        <md-menu md-size="small">
            <div class="md-menu__trigger" md-menu-trigger>
                <i class="fas fa-bars"></i>
            </div>

            <md-menu-content>
                <md-menu-item>
                    <input
                        @change="openFile()"
                        type="file"
                        name="open-file"
                        id="open-file"
                        class="md-menu-item__button custom-file-input">
                </md-menu-item>
                <md-menu-item>
                    <div
                        @click="exportToFile()"
                        class="md-menu-item__button">Export to file</div>
                </md-menu-item>
            </md-menu-content>
        </md-menu>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .md-menu-content {
        width: 200px;

        .md-list-item-content {
            //padding: 0!important;

            .md-menu-item__button {
                cursor: pointer;
                width: 200px;
                height: 100%;
                padding: 10px;
                font-size: 12px;

                &:hover {
                    background: $grey-10;
                }
            }

            .custom-file-input {
                color: transparent;
                margin: 0;
                border: 0;
                background: transparent;
                outline: none;
            }
            .custom-file-input::-webkit-file-upload-button {
                visibility: hidden;
            }
            .custom-file-input::before {
                content: 'Open';
                color: #000;
                display: inline-block;
                outline: none;
                white-space: nowrap;
                -webkit-user-select: none;
            }
            .custom-file-input:hover::before {
                //border-color: black;
            }
            .custom-file-input:active {
                outline: 0;
            }
            .custom-file-input:active::before {
                //background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
            }
        }


    }

    .topbar {
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        display: flex;
        justify-content: space-between;
        position: relative;

        .md-menu {
            position: absolute;
            right: 12px;
            top: 8px;

            .md-menu__trigger {
                font-size: 20px;
                padding: 8px;
                cursor: pointer;
            }
        }
    }
</style>

