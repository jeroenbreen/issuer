
class _Item {

    constructor(item) {
        this.horizontal = item.horizontal;
        this.vertical = item.vertical;
        this.x = item.x;
        this.y = item.y;
        this.width = item.width;
        this.height = item.height;
    }

    getX(template) {
        switch (this.horizontal) {

            case '':
                return this.x;
            case 'centered':
                return (template.getElementAreaWidth() - this.width) / 2;
        }
    }

    isDraggable() {
        return this.horizontal === '' || this.vertical === '';
    }

    getAxis() {
        if (this.horizontal === '' && this.vertical === '') {
            return 'both';
        } else if (this.horizontal === '') {
            return 'x';
        } else {
            return 'y';
        }
    }

    clone() {
        return {...this}
    }
}



export {_Item};