import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatBadgeModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})

export class Navbar {
  @Input() city: string = 'Magdeburg';
  @Input() notifications = 1;
  @Output() menuClick = new EventEmitter<void>();

  @Output() locationClick = new EventEmitter<void>();
}