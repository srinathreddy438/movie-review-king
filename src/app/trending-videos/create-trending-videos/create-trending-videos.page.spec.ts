import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrendingVideosPage } from './create-trending-videos.page';

describe('CreateTrendingVideosPage', () => {
  let component: CreateTrendingVideosPage;
  let fixture: ComponentFixture<CreateTrendingVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTrendingVideosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTrendingVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
