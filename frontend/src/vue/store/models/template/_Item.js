
class _Item {

    constructor(item) {
        this.x = item ? item.x : 0;
        this.y = item ? item.y : 0;
        this.width = item ? item.width : 200;
        this.height = item ? item.height : 200;
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