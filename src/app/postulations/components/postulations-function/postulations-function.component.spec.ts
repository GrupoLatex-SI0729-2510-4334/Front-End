import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsFunctionComponent } from './postulations-function.component';

describe('PostulationsFunctionComponent', () => {
  let component: PostulationsFunctionComponent;
  let fixture: ComponentFixture<PostulationsFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulationsFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationsFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
