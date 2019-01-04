import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewFormPage } from './review-form.page';

describe('ReviewFormPage', () => {
  let component: ReviewFormPage;
  let fixture: ComponentFixture<ReviewFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
