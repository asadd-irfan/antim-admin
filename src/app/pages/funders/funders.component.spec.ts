import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundersComponent } from './funders.component';

describe('FundersComponent', () => {
  let component: FundersComponent;
  let fixture: ComponentFixture<FundersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
