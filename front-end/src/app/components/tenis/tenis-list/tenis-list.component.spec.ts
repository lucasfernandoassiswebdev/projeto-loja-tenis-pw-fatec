import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenisListComponent } from './tenis-list.component';

describe('TenisListComponent', () => {
  let component: TenisListComponent;
  let fixture: ComponentFixture<TenisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
