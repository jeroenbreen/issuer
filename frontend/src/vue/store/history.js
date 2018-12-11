import Vue from 'vue';


class $History {
    constructor (data = {frames: [], currentFrameIndex: -1}) {
        this.store = new Vue({ data })
    }

    get state () {
        return this.store.$data
    }

    addFrameAndExecute(frame) {
        this.addFrame(frame);
        frame.redo();
    }

    addFrame(frame) {
        this.store.frames.push(frame);
        this.store.currentFrameIndex = this.store.frames.length - 1;
        // todo chop of end if canRedo()
    }

    canUndo() {
        return this.store.currentFrameIndex > -1;
    }

    canRedo() {
        return this.store.currentFrameIndex < this.store.frames.length - 1;
    }

    undo() {
        if (this.canUndo()) {
            let frame = this._getCurrentFrame();
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

    _getCurrentFrame() {
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

