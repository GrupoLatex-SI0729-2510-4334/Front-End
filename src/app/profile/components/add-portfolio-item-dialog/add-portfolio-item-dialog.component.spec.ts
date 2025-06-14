import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortfolioItemDialogComponent } from './add-portfolio-item-dialog.component';

describe('AddPortfolioItemDialogComponent', () => {
  let component: AddPortfolioItemDialogComponent;
  let fixture: ComponentFixture<AddPortfolioItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPortfolioItemDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPortfolioItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
