import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolaFormComponent } from './sola-form.component';

describe('SolaFormComponent', () => {
  let component: SolaFormComponent;
  let fixture: ComponentFixture<SolaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
