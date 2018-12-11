class Status  {

    constructor(status) {
        this._id = status._id;
        this.title = status.title;
        this.color = status.color;
        this.order = status.order;
        this.type = status.type;
    }

    toBackend() {
        return {...this};
    }

}

export {Status};