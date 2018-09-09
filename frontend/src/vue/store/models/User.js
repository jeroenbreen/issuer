class User {

    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.thumbnail = user.thumbnail;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

}

export {User};