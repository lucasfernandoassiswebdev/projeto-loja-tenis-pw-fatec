import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenisFormComponent } from './tenis-form.component';

describe('TenisFormComponent', () => {
  let component: TenisFormComponent;
  let fixture: ComponentFixture<TenisFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenisFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
