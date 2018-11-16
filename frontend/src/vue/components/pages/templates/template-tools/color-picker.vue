<script>
    import vueColor from 'vue-color';

    export default {
        name: 'color-picker',
        components: {
            'compact-picker': vueColor.Compact
        },
        props: ['item'],
        data() {
            return {
                showPicker: false
            }
        },
        methods: {
            updateValue(value) {
                this.item.background = value.hex;
                this.closePicker();
            },
            openPicker() {
                this.showPicker = true;
            },
            closePicker() {
                console.log("!");
                this.showPicker = false;
            }
        }
    }
</script>


<template>
    <div class="template-tools__section">
        <div class="template-tools__row">
            <div class="template-tools__label">
                Background
            </div>
            <div class="swatch__wrapper">
                <div
                    class="swatch"
                    @click="openPicker()"
                    :style="{'background': item.background}"></div>

                <input v-model="item.background">
                <compact-picker
                    v-if="showPicker"
                    @input="updateValue"
                    :value="item.background" />
            </div>


        </div>
    </div>
</template>


<style lang="scss" scoped>

    .swatch__wrapper {
        position: relative;
        margin-top: 4px;
        display: flex;
        align-items: center;

        .swatch {
            width: 15px;
            height: 15px;
            border: 1px solid #ddd;
            margin-right: 4px;
        }

        input {
            border: 1px solid #ddd;
            background: transparent;
            padding: 4px;
            width: 55px;
            margin: 0;
        }



        .vc-compact {
            position: absolute;
            left: -5px;
            top: -5px;
            width: 85px;
        }
    }

</style>