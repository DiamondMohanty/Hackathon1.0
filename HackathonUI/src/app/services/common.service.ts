import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './urls';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private httpClient: HttpClient, private urlService: UrlService) {}

    addRemoveModule(moduleId: number, userId: number, addRemoveFlag: string): Observable<any> {

        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        let req_info = {
            'module_id': moduleId,
            'team_id': userId,
            'add_remove': addRemoveFlag
        };        
        console.log(req_info);
                
        return this.httpClient.post(this.urlService.add_remove_modules(), req_info, headers).map(res => res);

    }

}