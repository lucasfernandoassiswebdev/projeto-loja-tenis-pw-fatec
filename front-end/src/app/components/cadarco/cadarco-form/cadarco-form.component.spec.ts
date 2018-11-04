import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadarcoFormComponent } from './cadarco-form.component';

describe('CadarcoFormComponent', () => {
  let component: CadarcoFormComponent;
  let fixture: ComponentFixture<CadarcoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadarcoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadarcoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
