<script>
    import {ElementMixin, HandleDirective} from "vue-slicksort";

    import hourlyLine from "./line/hourly-line";
    import sumLine from "./line/sum-line";
    import subtotalLine from "./line/subtotal-line";
    import textLine from "./line/text-line";
    import breakLine from "./line/break-line";


    export default {
        name: 'doc-line',
        components: {
            hourlyLine, sumLine, subtotalLine, textLine, breakLine
        },
        mixins: [ElementMixin],
        directives: { handle: HandleDirective },
        props: ['line', 'tools', 'scale'],
        methods: {
            removeLine() {
                this.line.page.removeLine(this.line);
            },
            isEditable() {
                return !this.line.document.locked && this.tools;
            }
        }
    }
</script>


<template>
    <li
        v-bind:style="{'height': scale(20) + 'px', 'min-height': scale(20) + 'px', 'margin-bottom': scale(4) + 'px'}"
        v-bind:class="{'line--text': line.type === 'text'}"
        class="line">
        <div v-if="isEditable()" class="line__grip handle" v-handle>
            <div class="grip__bar"></div>
            <div class="grip__bar"></div>
            <div class="grip__bar"></div>
            <div class="grip__bar"></div>
        </div>

        <hourly-line
                v-if="line.type === 'hourly'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>
        <sum-line
                v-if="line.type === 'sum'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>

        <subtotal-line
                v-if="line.type === 'subtotal'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>

        <text-line
                v-if="line.type === 'text'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>

        <break-line
                v-if="line.type === 'break'"
                v-bind:line="line"
                v-bind:editable="isEditable()"/>


        <div class="line__tools" v-if="isEditable()">
            <div
                v-on:click="removeLine()"
                class="line__tool">
                <i class="fas fa-times"></i>
            </div>
        </div>
    </li>
</template>


<style lang="less">
    .line {
        position: relative;
        background: #fff;
        list-style: none;

        &.line--text {
            height: auto!important;
        }

        .line__row {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &.line__row--heavy {
                font-weight: 700;
                font-size: 120%;
            }

            .line-part--100 {
                width: 100%;
            }

            .line-part--75 {
                width: 75%;
            }

            .line-part--50 {
                width: 50%;
            }

            .line-part--25 {
                width: 25%;
            }

            .line-part {
                display: flex;
                align-items: center;
            }

            .line-part--start {
                padding-right: 10px;
            }

            .line-part--middle {
                padding: 0 10px;
            }

            .line-part--end {
                padding-left: 10px;
                display: flex;
                justify-content: flex-end;

                input {
                    text-align: right;
                }
            }

            input,
            textarea {
                width: 100%;
                background: #f5f5f5;
                border: 0;
                padding: 4px;
                margin: -4px;
                font-size: 10px;

                &:focus {
                    outline: none;
                    background: @grey-10;
                }

                &.line-input--number {
                    width: 32px;
                }

                &.line-input--big-number {
                    width: 48px;
                }
            }
        }

        .line__grip {
            position: absolute;
            top: -2px;
            left: -30px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            padding: 7px 6px 6px 6px;
            cursor: move;


            .grip__bar {
                background: @editing-mode-color-contra;
                width: 100%;
                height: 2px;
                margin-bottom: 1px;
            }

            &:hover {
                background: @editing-mode-color;
            }
        }

        .line-part__set {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .line__subtotal {
            margin-bottom: 28px;
        }
    }
</style>