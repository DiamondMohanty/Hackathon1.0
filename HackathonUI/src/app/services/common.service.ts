import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UrlService } from './urls';
import { Observable } from 'rxjs';
import { SaveDocument } from '../models/section.model';
import { Session } from './session.service';

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

    publishDoc(saveDocument: SaveDocument): Observable<any> {
        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        console.log(saveDocument);
        return this.httpClient.post(this.urlService.publish_doc_url(), saveDocument, headers).map(res => res);
    }

    getDoc(teamId: number): Observable<any> {
        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.httpClient.post(this.urlService.get_doc_url(), {'teamId': teamId}, headers).map(res => res);
    }

    viewDoc(docId: number): Observable<any> {
        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.httpClient.post(this.urlService.view_doc_url(), {'documentId': docId}, headers).map(res => res);
    }

    searchDoc(intent: string): Observable<any> {
        let headers = { headers: new HttpHeaders({'Content-Type': 'application/json'})};
        return this.httpClient.post(this.urlService.search_doc_url(), {'intent': intent}, headers).map(res => res);
    }

}