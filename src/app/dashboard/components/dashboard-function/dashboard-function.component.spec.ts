import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFunctionComponent } from './dashboard-function.component';

describe('DashboardFunctionComponent', () => {
  let component: DashboardFunctionComponent;
  let fixture: ComponentFixture<DashboardFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
