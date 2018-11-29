<script>
    import logo from './logo';
    import {Tools} from "@root/vue/tools/tools";
    import {dataToStore} from '@root/vue/data-to-store'


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
                let file = {},
                    state = {},
                    objs = ['company', 'settings'],
                    ignore = ['modal', 'templateEditor'];
                // todo write test
                for (let key in this.$store.state) {
                    if (ignore.indexOf(key) === -1) {
                        if (objs.indexOf(key) > -1) {
                            state[key] = {...this.$store.state[key]};
                        } else {
                            state[key] = [];
                            for (let item of this.$store.state[key].all) {
                                state[key].push(item.toBackend());
                            }
                        }
                    }
                }

                function download(content, fileName, contentType) {
                    let el, file;
                    el = document.createElement('a');
                    file = new Blob([content], {type: contentType});
                    el.href = URL.createObjectURL(file);
                    el.download = fileName;
                    el.click();
                }
                file.type = 'doculator';
                file.version = '1.0.0';
                file.state = state;
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

        <div class="top-bar__tools">
            <input @change="openFile()" type="file" name="open-file" id="open-file" class="custom-file-input">
            <button @click="exportToFile()">Export to file</button>
        </div>

    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .topbar {
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        display: flex;
        justify-content: space-between;

        .top-bar__tools {
            display: flex;
            flex-wrap: nowrap;

            .custom-file-input {
                color: transparent;
                padding: 0;
                margin: 0;
                border: 0;
                background: transparent;
                outline: none;
                width: 60px;
            }
            .custom-file-input::-webkit-file-upload-button {
                visibility: hidden;
            }
            .custom-file-input::before {
                content: 'Open';
                color: black;
                display: inline-block;
                background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
                border: 1px solid #999;
                border-radius: 3px;
                padding: 5px 8px;
                outline: none;
                white-space: nowrap;
                -webkit-user-select: none;
                cursor: pointer;
                text-shadow: 1px 1px #fff;
                font-weight: 700;
                font-size: 10pt;
            }
            .custom-file-input:hover::before {
                border-color: black;
            }
            .custom-file-input:active {
                outline: 0;
            }
            .custom-file-input:active::before {
                background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
            }
        }
    }
</style>

