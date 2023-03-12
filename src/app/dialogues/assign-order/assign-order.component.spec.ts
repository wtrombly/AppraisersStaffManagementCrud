import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrderComponent } from './assign-order.component';

describe('AssignOrderComponent', () => {
  let component: AssignOrderComponent;
  let fixture: ComponentFixture<AssignOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
