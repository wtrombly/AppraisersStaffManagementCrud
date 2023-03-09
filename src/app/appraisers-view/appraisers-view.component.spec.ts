import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisersViewComponent } from './appraisers-view.component';

describe('AppraisersViewComponent', () => {
  let component: AppraisersViewComponent;
  let fixture: ComponentFixture<AppraisersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraisersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
