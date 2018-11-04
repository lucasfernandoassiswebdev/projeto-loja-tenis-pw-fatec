import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadarcoListComponent } from './cadarco-list.component';

describe('CadarcoListComponent', () => {
  let component: CadarcoListComponent;
  let fixture: ComponentFixture<CadarcoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadarcoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadarcoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
