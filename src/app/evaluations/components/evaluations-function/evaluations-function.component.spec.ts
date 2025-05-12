import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationsFunctionComponent } from './evaluations-function.component';

describe('EvaluationsFunctionComponent', () => {
  let component: EvaluationsFunctionComponent;
  let fixture: ComponentFixture<EvaluationsFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluationsFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationsFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
