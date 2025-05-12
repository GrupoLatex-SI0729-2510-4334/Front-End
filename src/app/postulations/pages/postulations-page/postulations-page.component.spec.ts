import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationsPageComponent } from './postulations-page.component';

describe('PostulationsPageComponent', () => {
  let component: PostulationsPageComponent;
  let fixture: ComponentFixture<PostulationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
