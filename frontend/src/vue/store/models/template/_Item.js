
class _Item {

    constructor(item) {
        this.draggable = true;
        this.x = item.x;
        this.y = item.y;
        this.width = item.width;
        this.height = item.height;
        this.page = item.page;
        this.padding = item.padding;
        this.background = item.background;
    }

    clone() {
        return {...this}
    }
}



export {_Item};