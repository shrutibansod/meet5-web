import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-sort-dialog',
  standalone: true,
  templateUrl: './sort-dialog.html',
  styleUrls: ['./sort-dialog.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule
  ]
})
export class SortDialog {

  private dialogRef = inject(MatDialogRef<SortDialog>);
  private fb = inject(FormBuilder);

  sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'star' },
    { value: 'participants', label: 'Number of Participants', icon: 'groups' },
    { value: 'dateTime', label: 'Date & Time', icon: 'schedule' },
    { value: 'distance', label: 'Distance', icon: 'place' },
    { value: 'creationDate', label: 'Creation Date', icon: 'calendar_today' }
  ];

  form = this.fb.group({
    sortBy: ['relevance']
  });

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  reset() {
    this.form.patchValue({ sortBy: 'relevance' });
  }
}