import {User} from './User'

class App {

    constructor() {
        this.users = [];
        this.currentUser = null;
    }

    bootstrap(data) {
        for (let  user of data.users) {
            this.addUser(user);
        }
    }

    addUser(user) {
        this.users.push(
            new User(user)
        );
    }

    setCurrentUser(user) {
        this.currentUser = user;
    }

}

export {App};