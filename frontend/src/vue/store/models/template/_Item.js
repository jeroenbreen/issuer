
class _Item {

    constructor(item) {
        this.x = item.x;
        this.y = item.y;
        this.width = item.width;
        this.height = item.height;
        this.page = item.page;
        this.padding = item.padding;
        this.background = item.background;
    }

    getX(template) {
        switch (this.horizontal) {

            case '':
                return this.x;
            case 'centered':
                return (template.getElementAreaWidth() - this.width) / 2;
        }
    }

    clone() {
        return {...this}
    }
}



export {_Item};