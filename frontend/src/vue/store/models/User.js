import _Updatable_Object from './_Updatable_Object'

class User extends _Updatable_Object {

    constructor(user) {
        super(user);
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

    // action label in the history
    getActionTitle() {
        return 'profile of ' + this.getFullName();
    }
}

export {User};