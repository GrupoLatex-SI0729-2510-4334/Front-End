import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatedEventsPageComponent } from './evaluated-events-page.component';

describe('EvaluatedEventsPageComponent', () => {
  let component: EvaluatedEventsPageComponent;
  let fixture: ComponentFixture<EvaluatedEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluatedEventsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluatedEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
