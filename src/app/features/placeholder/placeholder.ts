// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-placeholder',
//   imports: [],
//   templateUrl: './placeholder.html',
//   styleUrl: './placeholder.scss',
// })

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-content>
          This page is a placeholder for the evaluation task.
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class Placeholder {
  title!: string;
  constructor(private route: ActivatedRoute) {
    this.title = this.route.snapshot.data['title'] ?? 'Placeholder';
  }
}

