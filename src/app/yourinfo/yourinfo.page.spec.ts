import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourinfoPage } from './yourinfo.page';

describe('YourinfoPage', () => {
  let component: YourinfoPage;
  let fixture: ComponentFixture<YourinfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourinfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourinfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
