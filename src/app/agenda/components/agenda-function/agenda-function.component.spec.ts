import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaFunctionComponent } from './agenda-function.component';



describe('AgendaFunctionComponent', () => {
  let component: AgendaFunctionComponent;
  let fixture: ComponentFixture<AgendaFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
