import Vue from 'vue';


class $History {
    constructor (data = {frames: [], currentFrameIndex: -1}) {
        this.store = new Vue({ data })
    }

    addFrameAndExecute(frame) {
        this.addFrame(frame);
        frame.redo();
    }

    addFrame(frame) {
        if (this.store.currentFrameIndex !== this.store.frames.length - 1) {
            let l = this.store.currentFrameIndex - (this.store.frames.length - 1);
            this.store.frames.splice(l);
        }

        this.store.frames.push(frame);
        this.store.currentFrameIndex = this.store.frames.length - 1;

    }

    canUndo() {
        return this.store.currentFrameIndex > -1;
    }

    canRedo() {
        return this.store.currentFrameIndex < this.store.frames.length - 1;
    }

    undo() {
        if (this.canUndo()) {
            let frame = this.getCurrentFrame();
            frame.undo();
            this.store.currentFrameIndex--;
        }
    }

    redo() {
        if (this.canRedo()) {
            let frame = this._getNextFrame();
            frame.redo();
            this.store.currentFrameIndex++;
        }
    }

    getCurrentFrame() {
        return this.store.frames[this.store.currentFrameIndex];
    }

    _getNextFrame() {
        return this.store.frames[this.store.currentFrameIndex + 1];
    }
}

const History = {
    install (Vue, options) {
        Vue.prototype.$history = new $History();
    }
};

export default History;

