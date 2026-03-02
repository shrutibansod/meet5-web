import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { ActivityFilters, CategoryFilter } from '../../models/activity-filter.model';
import { MatSelectModule } from '@angular/material/select';

export type FilterDialogData = {
  initial: ActivityFilters;
  categories: CategoryFilter[];
};

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDividerModule,
    MatSelectModule,
  ],
  templateUrl: './filter-dialog.html',
  styleUrls: ['./filter-dialog.scss'],
})
export class FilterDialog {
  private dialogRef = inject(MatDialogRef<FilterDialog, ActivityFilters | null>);
  private data = inject<FilterDialogData>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  filterForm: FormGroup;
  languages = [
    'English',
    'German',
    'Spanish',
    'French',
    'Italian'
  ];

  constructor( fb: FormBuilder) {
    this.filterForm = this.fb.group({
      language: [''],
      categories: [[]]
    });
  }

  readonly categories = this.data.categories;

  // Use getRawValue() to return full state on apply
  form = this.fb.group({
    categories: this.fb.control<string[]>([...this.data.initial.categories]),
    ageMin: this.fb.control<number>(this.data.initial.ageMin),
    ageMax: this.fb.control<number>(this.data.initial.ageMax),

    type: this.fb.control<ActivityFilters['type']>(this.data.initial.type),

    hideFull: this.fb.control<boolean>(this.data.initial.hideFull),
    hideXXL: this.fb.control<boolean>(this.data.initial.hideXXL),
    hideGlobal: this.fb.control<boolean>(this.data.initial.hideGlobal),

    dateRangeEnabled: this.fb.control<boolean>(this.data.initial.dateRangeEnabled),
  });

  cancel() {
    this.dialogRef.close(null);
  }

  apply() {
    const v = this.form.getRawValue();

    // Ensure sane age range
    const min = Math.min(v.ageMin ?? 18, v.ageMax ?? 80);
    const max = Math.max(v.ageMin ?? 18, v.ageMax ?? 80);

    this.dialogRef.close({
      categories: v.categories ?? [],
      ageMin: min,
      ageMax: max,
      type: v.type ?? 'all',
      hideFull: !!v.hideFull,
      hideXXL: !!v.hideXXL,
      hideGlobal: !!v.hideGlobal,
      dateRangeEnabled: !!v.dateRangeEnabled,
    });
  }

  toggleCategory(id: string) {
    const current = this.form.controls.categories.value ?? [];
    const next = current.includes(id)
      ? current.filter(x => x !== id)
      : [...current, id];

    this.form.controls.categories.setValue(next);
  }

  isSelected(id: string): boolean {
    return (this.form.controls.categories.value ?? []).includes(id);
  }
}