import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRequestDetailsComponent } from './customer-request-details.component';

describe('CustomerRequestDetailsComponent', () => {
  let component: CustomerRequestDetailsComponent;
  let fixture: ComponentFixture<CustomerRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
