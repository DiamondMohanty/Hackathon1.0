import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Session } from '../services/session.service';
import { Section, Document } from '../models/document.model';
import { UrlService } from '../services/urls';
import { SaveDocument, Question, SaveSection } from '../models/section.model';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-upload-kt',
  templateUrl: './upload-kt.component.html',
  styleUrls: ['./upload-kt.component.css']
})
export class UploadKTComponent implements OnInit {

  fileUploadText = "Click Here to choose a file";
  uploadDocument: Document = { sections: [] };
  constructor(private http: HttpClient, private session: Session, private urls: UrlService, private commonService: CommonService) { }
  percentDone = 0;
  uploadSuccess = false;
  step = 'upload';
  sections: string[] = [];
  currentPage: number = 0;
  currentQuestion: number = 0;
  saveSections: SaveSection[] = [];
  saveDocument: SaveDocument;



  ngOnInit() { }

  upload(files: any[]) {
    let firstFile = files[0];
    this.fileUploadText = firstFile.name;
    this.uploadAndProgress(files);
  }

  uploadAndProgress(files: File[]) {

    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    formData.append('user_id', this.session.getSessionUser().userId.toString());

    this.http.post(this.urls.baseUrl + 'get/docx-contents', formData, { reportProgress: true, observe: 'events' })
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
          this.saveDocument = {
            documentTitle: "",
            documentDescription: "",
            userId: this.session.getSessionUser().userId,
            sectionData: []
          };

          event['body']['data'].forEach(ele => {
            let newSection: SaveSection = {
              sectionTitle: ele['title'],
              sectionContents: JSON.stringify(ele['content']),
              questions: [{
                  text: "",
                  opt1: "",
                  opt2: "",
                  opt3: "",
                  opt4: "",
                  ans: "",
                }]
            }
            this.saveDocument.sectionData.push(newSection);
          });
            
          this.step = 'review';
        }
      });
  }

  switchToPage(pageNumber: number) {
    this.currentQuestion = 0;
    this.currentPage = pageNumber;
  }

  switchToQuestions(questionNumber: number) {
    this.currentQuestion = questionNumber;
  }

  addQuestion() {
    this.saveDocument.sectionData[this.currentPage].questions.push({
      text: "",
      opt1: "",
      opt2: "",
      opt3: "",
      opt4: "",
      ans: "",
    });
    this.switchToQuestions(this.saveDocument.sectionData[this.currentPage].questions.length - 1);
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
      this.uploadDocument = { sections: [] };
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
    this.commonService.publishDoc(this.saveDocument).subscribe();

  }

}
