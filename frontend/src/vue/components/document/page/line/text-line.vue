<script>
    import $ from 'jquery';
    import { vueEditor } from "vue2-editor";

    export default {
        name: 'text-line',
        components: {
            vueEditor
        },
        props: ['line', 'editable'],
        data() {
            return {
                customToolbar: [
                    [{ 'header': [false, 1, 2 ] }],
                    ["bold", "italic"],
                    [{list: "bullet"}],
                    ["link"]
                ],
                id: Math.random().toString(36).substring(7)
            }
        },
        methods: {
            onEditorFocus() {
                //$('.ql-toolbar').show();
            },
            onEditorBlur() {
                console.log('blur');
                //$('.ql-toolbar').hide();
            }
        }
    }
</script>


<template>
    <div class="line__text">
        <div class="line__row">
            <vue-editor
                    v-if="editable"
                    v-bind:id="id"
                    v-model="line.text"
                    :editorToolbar="customToolbar"
                    @focus="onEditorFocus"
                    @blur="onEditorBlur"></vue-editor>
            <div
                    v-if="!editable"
                    v-html="line.text"></div>
        </div>
    </div>
</template>


<style lang="less">
    body .quillWrapper .ql-container .ql-editor,
    body .quillWrapper .ql-container .ql-editor p,
    .line__text {
        font-family: 'Open Sans';
        font-size: 10px;
        line-height: 1.6;
        text-align: left;

        h1 {
            font-family: 'Tinos';
            font-size: 20px;
            margin-bottom: 20px;
            margin-top: 0;
        }

        h2 {
            font-family: 'Roboto condensed';
            font-size: 14px;
            margin-bottom: 10px;
            margin-top: 0;
            font-weight: 400;
            text-transform: uppercase;
        }

        p {
            margin: 0;
        }
    }

    body {

        .quillWrapper {
            width: 100%;

            .ql-toolbar.ql-snow {
                position: absolute;
                left: 0;
                bottom: ~'calc(100% + 10px)';
                width: 100%;
                box-shadow: 2px 2px 6px rgba(0,0,0,0.2);
                border: 0;
                background: @editing-mode-color;
                padding: 0;

                .ql-formats {
                    margin: 0;
                    padding: 5px 10px;
                    border-right: 1px solid @editing-mode-color-hover;

                    &:last-child {
                        border-right: 0;
                    }

                    .ql-picker {

                        :hover {
                            background: @editing-mode-color-hover;
                            color: inherit;
                        }
                    }

                    button {
                        background: none;
                        cursor: pointer;
                        display: inline-block;
                        float: left;
                        height: 24px;
                        padding: 0 3px;
                        width: 24px;
                        font-size: 10px;
                        margin-right: 3px;

                        &:last-child {
                            margin-right: 0;
                        }

                        &:hover {
                            background: @editing-mode-color-hover;

                            svg {

                                path,
                                line {
                                    stroke: #000;
                                }
                            }
                        }

                        svg {
                            width: 16px;
                            height: 16px;

                            path {
                                stroke: #000;
                            }
                        }
                    }


                    .ql-picker-label {
                        font-size: inherit;
                    }
                }


            }

            .ql-container {
                position: relative;
                left: 0;
                top: 0;
                width: 100%;
                border: 0;

                .ql-editor {
                    margin: -4px;
                    padding: 4px;
                    min-height: 20px;
                    background: #f5f5f5;
                }
            }
        }
    }

    .document--locked {

        .ql-toolbar {
            display: none;
        }
    }
</style>