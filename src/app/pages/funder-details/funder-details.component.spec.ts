import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunderDetailsComponent } from './funder-details.component';

describe('FunderDetailsComponent', () => {
  let component: FunderDetailsComponent;
  let fixture: ComponentFixture<FunderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
