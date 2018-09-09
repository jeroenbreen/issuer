class User {

    constructor(user) {
        this._id = user ? user._id : null;
        this.firstName = user ? user.firstName : '';
        this.lastName = user ? user.lastName : '';
        this.initals = user ? user.initials : '';
        this.email = user ? user.email : '';
        this.githubId = user ? user.githubId : '';
        this.thumbnail = user ? user.thumbnail : '';
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

}

export {User};