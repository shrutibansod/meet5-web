import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortDialog } from './sort-dialog';

describe('SortDialog', () => {
  let component: SortDialog;
  let fixture: ComponentFixture<SortDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SortDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
