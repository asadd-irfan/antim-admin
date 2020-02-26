import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundersRequestsComponent } from './funders-requests.component';

describe('FundersRequestsComponent', () => {
  let component: FundersRequestsComponent;
  let fixture: ComponentFixture<FundersRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundersRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundersRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
