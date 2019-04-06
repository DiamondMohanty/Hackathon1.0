import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewKTComponent } from './view-kt.component';

describe('ViewKTComponent', () => {
  let component: ViewKTComponent;
  let fixture: ComponentFixture<ViewKTComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewKTComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewKTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
