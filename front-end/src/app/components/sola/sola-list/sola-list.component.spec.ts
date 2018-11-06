import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolaListComponent } from './sola-list.component';

describe('SolaListComponent', () => {
  let component: SolaListComponent;
  let fixture: ComponentFixture<SolaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
