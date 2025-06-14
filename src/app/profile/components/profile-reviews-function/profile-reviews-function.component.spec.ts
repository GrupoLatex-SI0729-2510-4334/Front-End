import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewsFunctionComponent } from './profile-reviews-function.component';

describe('ProfileReviewsFunctionComponent', () => {
  let component: ProfileReviewsFunctionComponent;
  let fixture: ComponentFixture<ProfileReviewsFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileReviewsFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileReviewsFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
