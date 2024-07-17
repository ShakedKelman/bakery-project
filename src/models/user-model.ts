interface UserObject {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class UserModel {
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(userObject: UserObject) {
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.password = userObject.password;
    }
}
