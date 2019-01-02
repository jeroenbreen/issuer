<script>
    import logo from './logo';
    import history from './history';
    import {Tools} from "@root/vue/tools/tools";
    import {storeToFile, dataToStore} from '@root/vue/store/store-functions'


    export default {
        name: 'top-bar',
        props: ['model'],
        components: {
            logo, history
        },
        methods: {
            getCurrentUser() {
                return this.$store.state.users.current;
            },
            toggleMenu() {
                this.$store.commit('ui/toggleMenu')
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
                let file, store, router;
                file = document.getElementById("open-file").files[0];
                store = this.$store;
                router = this.$router;

                function callback() {
                    let reader = new FileReader();
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        let data = JSON.parse(evt.target.result);
                        if (data.type === 'doculator') {
                            dataToStore(store, data.state);
                            store.commit('message', {
                                message: 'File imported. Due to a known bug, you first have press a page in the menu (left) to view the applied data.'
                            });
                        } else {
                            store.commit('message', {
                                message: 'This doesnt look like a doculator file'
                            });
                        }
                    };
                    reader.onerror = function (evt) {
                        console.log('Error reading file');
                    };
                    store.commit('ui/toggleMenu');
                }

                if (file) {


                    let fileData = localStorage.getItem('doculator');

                    if (fileData) {
                        this.$store.commit('confirm', {
                            message: 'Importing this data will overwrite your local storage data. Proceed?',
                            callback: callback
                        });

                    } else {
                        callback();
                    }



                }
            }
        },
        computed: {
            menuOpen() {
                return this.$store.state.ui.menu;
            }
        }
    }
</script>


<template>
    <div class="topbar">
        <!--<logo/>-->


        <div
            @click="toggleMenu()"
            class="hamburger">
            <div class="burger"></div>
            <div class="burger"></div>
            <div class="burger"></div>
        </div>

        <div
            v-show="menuOpen"
            class="top-bar-menu">
            <div class="menu-item">
                <input
                    @change="openFile()"
                    type="file"
                    name="open-file"
                    id="open-file"
                    class="md-menu-item__button custom-file-input">
            </div>
            <div @click="exportToFile()"
                class="menu-item">
                Export to file
            </div>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';


    .hamburger {
        float: right;
        cursor: pointer;
        padding: 6px 10px;

        .burger {
            height: 5px;
            width: 5px;
            border-radius: 50%;
            margin-bottom: 3px;
            background: #000;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .top-bar-menu {
        position: absolute;
        top: 45px;
        right: 0;
        width: 200px;
        background: #fff;
        box-shadow: -2px 2px 20px rgba(0,0,0,0.2);
        z-index: 100;

        .menu-item {
            cursor: pointer;
            width: 200px;
            height: 100%;
            padding: 10px;
            border-bottom: $generalBorder;

            &:hover {
                background: $grey-10;
            }

            .custom-file-input {
                color: transparent;
                margin: 0;
                border: 0;
                background: transparent;
                outline: none;
                padding: 0;
                font-family: inherit;
                font-weight: inherit;
                cursor: pointer;
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

            .custom-file-input:active {
                outline: 0;
            }
        }
    }



    .topbar {
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        position: relative;

        .history {
            position: absolute;
            left: 200px;
            top: 10px;
        }

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

