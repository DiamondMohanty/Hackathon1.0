import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    baseUrl = 'http://localhost:5000/api/1.0/';
    //baseUrl = 'https://ELEMONEATERS.pythonanywhere.com/api/1.0/';
    
    all_modules(): string {
        return this.baseUrl + 'modules/all';
    } 

    reg_modules(): string {
        return this.baseUrl + 'modules/registered';
    }

    login(): string {
        return this.baseUrl + 'login';
    }

    manage_modules(): string {
        return this.baseUrl + 'modules/manage';
    }

    add_remove_modules(): string {
        return this.baseUrl + 'team_module/modify';
    }
}
