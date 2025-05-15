import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsDetailsComponent } from './postulations-details.component';

describe('PostulationsDetailsComponent', () => {
  let component: PostulationsDetailsComponent;
  let fixture: ComponentFixture<PostulationsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulationsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
