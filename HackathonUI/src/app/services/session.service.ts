import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
@Injectable({
    providedIn: 'root'
})
export class Session {

    loggedInUser: User;

    setSession(user: User) {
        this.loggedInUser = user;
    }

    getSessionUser(): User {
        return this.loggedInUser
    }

}

