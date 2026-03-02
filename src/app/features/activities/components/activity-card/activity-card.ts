import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { AvatarGrid } from '../../../../shared/components/avatar-grid/avatar-grid';
import { Activity } from '../../../../core/services/activities';

@Component({
  selector: 'app-activity-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, AvatarGrid, DatePipe],
  templateUrl: './activity-card.html',
  styleUrls: ['./activity-card.scss']
})
export class ActivityCard {
  @Input({ required: true }) activity!: Activity;

  get joinedText(): string {
    const joined = this.activity.joined.length;
    const cap = this.activity.capacity;
    return `${joined} of ${cap} joined`;
  }
}