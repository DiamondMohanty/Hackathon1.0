import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './urls';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private httpClient: HttpClient, private urlService: UrlService) {}

    performLoginWithCreds(username: string, password: string): Observable<User> {

        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let user_info = {
            'user_id': 1,
            'user_password': 'password'
        };

        console.log(user_info);
        

        return this.httpClient.post(this.urlService.login(), user_info, headers).map(res => res['data']);

    }

}