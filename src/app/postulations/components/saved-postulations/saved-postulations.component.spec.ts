import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedPostulationsComponent } from './saved-postulations.component';

describe('SavedPostulationsComponent', () => {
  let component: SavedPostulationsComponent;
  let fixture: ComponentFixture<SavedPostulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedPostulationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedPostulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
