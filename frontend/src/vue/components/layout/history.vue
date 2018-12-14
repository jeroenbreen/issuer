<script>
    export default {
        name: 'history',
        computed: {
            frames() {
                return this.$history.store.frames;
            },
            canUndo() {
                return this.$history.canUndo();
            },
            canRedo() {
                return this.$history.canRedo();
            }
        },
        methods: {
            undo() {
                this.$history.undo();
            },
            redo() {
                this.$history.redo();
            },
            isCurrentFrame(frame) {
                return this.$history.getCurrentFrame() === frame;
            }
        }
    }
</script>


<template>
    <div class="history">
        <div class="history__frames">
            <div
                v-for="(frame, index) in frames"
                :key="index"
                :class="{'history__frame--current': isCurrentFrame(frame)}"
                class="history__frame">
                <md-tooltip>{{frame.action}}</md-tooltip>
            </div>
        </div>

        <div class="history__tools">
            <button
                v-if="canUndo"
                @click="undo()">undo</button>

            <button
                v-if="canRedo"
                @click="redo()">redo</button>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@styles/variables.scss';

    .history {
        background: pink;
        padding: 7px;
        display: flex;
        align-items: center;

        .history__frames {
            display: flex;
            margin-right: 10px;

            .history__frame {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #000;
                margin-right: 2px;

                &.history__frame--current {
                    background: #fff;
                }
            }
        }

    }
</style>