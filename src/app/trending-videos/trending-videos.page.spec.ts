import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendingVideosPage } from './trending-videos.page';

describe('TrendingVideosPage', () => {
  let component: TrendingVideosPage;
  let fixture: ComponentFixture<TrendingVideosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendingVideosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingVideosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
