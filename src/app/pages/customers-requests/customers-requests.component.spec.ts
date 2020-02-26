import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersRequestsComponent } from './customers-requests.component';

describe('CustomersRequestsComponent', () => {
  let component: CustomersRequestsComponent;
  let fixture: ComponentFixture<CustomersRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
