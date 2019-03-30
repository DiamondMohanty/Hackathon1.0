import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndaComponent } from './dnda.component';

describe('DndaComponent', () => {
  let component: DndaComponent;
  let fixture: ComponentFixture<DndaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DndaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DndaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
