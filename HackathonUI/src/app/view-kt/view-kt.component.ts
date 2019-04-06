import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Session } from '../services/session.service';
import { Section, Document } from '../models/document.model';
import { UrlService } from '../services/urls';
import { SaveDocument, Question, SaveSection } from '../models/section.model';
import { CommonService } from '../services/common.service';
import { element } from 'protractor';

@Component({
  selector: 'app-view-kt',
  templateUrl: './view-kt.component.html',
  styleUrls: ['./view-kt.component.css']
})
export class ViewKTComponent implements OnInit {


  constructor(private http: HttpClient, private session: Session, private urls: UrlService, private commonService: CommonService) { }
  step = 'viewList';
  sections: string[] = [];
  currentPage: number = 0;
  currentQuestion: number = 0;
  saveSections: SaveSection[] = [];
  saveDocument: SaveDocument;
  viewList: any[];
  docView = 'docDetails';
  searchQuery: string = "";



  ngOnInit() {
    this.fetchAllDocuments();
  }

  fetchAllDocuments() {

    this.commonService.getDoc(this.session.getSessionUser().teamId).
      subscribe(ele => this.viewList = ele.data
      );
  }

  viewDetails(docId) {
    this.commonService.viewDoc(docId).
      subscribe(ele => {
        let saveSections: SaveSection[] = [];
        ele.data.document.sections.forEach(ele => {
          let questions: Question[] = [];
          ele.questions.forEach(ques => {
            let newQuestion: Question = {
              ans: ques.question_ans,
              opt1: ques.question_opt1,
              opt2: ques.question_opt2,
              opt3: ques.question_opt3,
              opt4: ques.question_opt4,
              text: ques.question_text
            }
            questions.push(newQuestion);
          });
          let newSection: SaveSection = {
            sectionTitle: ele['section_title'],
            sectionContents: JSON.parse(ele['section_contents']),
            questions: questions
          }
          saveSections.push(newSection);
        });
        this.saveDocument = {
          documentTitle: ele.data.title,
          documentDescription: ele.data.description,
          userId: ele.data.author,
          sectionData: saveSections
        }
        this.step = "viewDetails";
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
    if (this.step == "viewDetails") {
      this.step = "viewList";

    } else {
      this.step = "viewList";
    }
  }

  proceed() {
    this.step = "publish";
  }

  publish() {
    this.commonService.publishDoc(this.saveDocument).subscribe();

  }
  takeQuiz() {
    this.docView = 'assessment';
  }
  goBack() {
    this.docView = 'docDetails';
  }
  search() {
    let baseUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/acc0d4b2-fb7f-478f-a00d-a24143dc4f0d?verbose=true&timezoneOffset=-360&subscription-key=27c4ce83551a41bfb7bf8da4100f1c23&q=" + this.searchQuery;
    this.http.get(baseUrl).subscribe(element => {
      console.log("LUIS Response")
      console.log(element);
      this.commonService.searchDoc(element["topScoringIntent"].intent).subscribe(ele => {
        this.viewList = this.viewList.filter(doc => doc.id === ele.data[0].document_id)
      });
    })
    if(this.searchQuery === ""){
      this.fetchAllDocuments() 
    }
  }
}
