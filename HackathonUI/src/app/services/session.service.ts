import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
@Injectable({
    providedIn: 'root'
})
export class Session {

    loggedInUser: User;
    

    setSession(user: User) {
        
        this.loggedInUser = user;
        
        sessionStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }
    

    getSessionUser(): User {
        return <User>JSON.parse(sessionStorage.getItem('user'));
    }

    expire() {
        this.loggedInUser = null;
        sessionStorage.removeItem('user');
    }

}

