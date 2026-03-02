import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { map, shareReplay } from 'rxjs';
import { Navbar } from '../navbar/navbar';

type NavItem = { label: string; icon: string; route: string };

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav
        #drawer
        class="sidenav"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) ? false : true"
      >
        <div class="sidenav-header">
          <div class="appname">meet5</div>
          <div class="subtitle">Web (dummy)</div>
        </div>

        <mat-nav-list>
          <a
            mat-list-item
            *ngFor="let item of nav"
            [routerLink]="item.route"
            routerLinkActive="active"
            (click)="closeIfHandset()"
          >
            <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
            <span matListItemTitle>{{ item.label }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="content">
        <app-navbar (menuClick)="drawer.toggle()" />

        <main class="main">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./sidebar.scss']
})
export class Sidebar {
  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;

  nav: NavItem[] = [
    { label: 'Activities', icon: 'place', route: '/activities' },
    { label: 'For me', icon: 'check_box', route: '/for-me' },
    { label: 'Discover', icon: 'explore', route: '/discover' },
    { label: 'Chats', icon: 'chat_bubble', route: '/chats' },
    { label: 'Profile', icon: 'person', route: '/profile' },
  ];

  // isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.TabletPortrait]).pipe(
  //   map(r => r.matches),
  //   shareReplay(1)
  // );
  isHandset$;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );
  }

  closeIfHandset() {
    // Close drawer on mobile/tablet portrait
    this.isHandset$.subscribe(isHandset => {
      if (isHandset) this.drawer.close();
    }).unsubscribe();
  }
}