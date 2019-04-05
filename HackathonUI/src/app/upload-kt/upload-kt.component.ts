import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Session } from '../services/session.service';
import { Section, Document } from '../models/document.model';

@Component({
  selector: 'app-upload-kt',
  templateUrl: './upload-kt.component.html',
  styleUrls: ['./upload-kt.component.css']
})
export class UploadKTComponent implements OnInit {

  fileUploadText = "Click Here to choose a file";
  uploadDocument: Document = {sections: []};
  constructor(private http: HttpClient, private session: Session) { }
  percentDone = 0;
  uploadSuccess  = false;
  step = 'upload';
  sections: string[] = [];

  ngOnInit() {
  }

  upload(files: any[]) {
    let firstFile = files[0];
    this.fileUploadText = firstFile.name; 
    this.uploadAndProgress(files);  
  }

  uploadAndProgress(files: File[]){
    
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    formData.append('user_id', this.session.getSessionUser().userId.toString());
    
    this.http.post('http://localhost:5000/api/get/docx-contents', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {        
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          event['body']['data'].forEach(ele => {            
            let newSection: Section = {
              heading: ele['title'],
              contents: ele['content']
            }
            this.sections.push(newSection.heading);
            this.uploadDocument.sections.push(newSection);
          });
          this.step = 'review';
        }
    });
  }

  currentStep(): string {
    if (this.step == "upload") {
      return "Step 1"
    } else if (this.step == "review") {
      return "Step 2"
    } else {
      return "Step 3"
    }
  }

  back() {
    if (this.step == "review") {
      this.step = "upload";
      this.uploadDocument = {sections: []};
      this.uploadSuccess = false;
      this.fileUploadText = "Click Here to choose a file";
      this.sections = [];
    } else {
      this.step = "review";
    }
  }

  proceed() {
    this.step = "publish";
  }

  publish() {

  }

}
