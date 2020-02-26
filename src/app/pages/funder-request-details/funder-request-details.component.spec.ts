import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunderRequestDetailsComponent } from './funder-request-details.component';

describe('FunderRequestDetailsComponent', () => {
  let component: FunderRequestDetailsComponent;
  let fixture: ComponentFixture<FunderRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunderRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunderRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
