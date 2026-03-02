import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

export type AvatarGridUser = {
  name: string;
  avatarUrl?: string;
};

@Component({
  selector: 'app-avatar-grid',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="grid" [style.--cols]="cols" [style.--size.px]="tileSize">
      <ng-container *ngFor="let tile of tiles; let i = index">
        <div class="tile" [class.empty]="!tile">
          <ng-container *ngIf="tile; else empty">
            <img *ngIf="tile.avatarUrl; else initials" [src]="tile.avatarUrl" [alt]="tile.name" />
            <ng-template #initials>
              <div class="initials">{{ getInitials(tile.name) }}</div>
            </ng-template>
          </ng-container>

          <ng-template #empty>
            <mat-icon class="plus">add</mat-icon>
          </ng-template>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./avatar-grid.scss']
})
export class AvatarGrid {
  @Input() users: AvatarGridUser[] = [];
  @Input() capacity = 12;

  // Desktop card: 4 columns feels close to your mobile grid, but scales well
  @Input() cols = 4;

  // Larger for web/iPad; adjust per card size
  @Input() tileSize = 72;

  get tiles(): (AvatarGridUser | null)[] {
    const filled = this.users.slice(0, this.capacity);
    const empties = Array.from({ length: Math.max(this.capacity - filled.length, 0) }, () => null);
    return [...filled, ...empties];
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map(p => p[0]?.toUpperCase()).join('');
  }
}