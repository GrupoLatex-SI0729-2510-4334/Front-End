import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFunctionComponent } from './search-function.component';

describe('SearchFunctionComponent', () => {
  let component: SearchFunctionComponent;
  let fixture: ComponentFixture<SearchFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFunctionComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
