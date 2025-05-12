import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFunctionComponent } from './profile-function.component';

describe('ProfileFunctionComponent', () => {
  let component: ProfileFunctionComponent;
  let fixture: ComponentFixture<ProfileFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFunctionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
