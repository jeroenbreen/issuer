class User {

    constructor(user) {
        this._id = user ? user._id : null;
        this.company_id = user ? user.company_id : '';
        this.firstName = user ? user.firstName : '';
        this.lastName = user ? user.lastName : '';
        this.initials = user ? user.initials : '';
        this.email = user ? user.email : '';
        this.githubKey = user ? user.githubKey : '';
        this.thumbnail = user ? user.thumbnail : '';
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    toBackend() {
        return {...this};
    }

}

export {User};