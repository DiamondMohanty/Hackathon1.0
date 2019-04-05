import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadKTComponent } from './upload-kt.component';

describe('UploadKTComponent', () => {
  let component: UploadKTComponent;
  let fixture: ComponentFixture<UploadKTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadKTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadKTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
